Template.orderEdit.onRendered(function() {
  setTimeout(function() {
    Session.set("profile", true);
  }, 100);
})

function randomNumber(number) {
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var str = "";
  for(var i = 0; i < number; i++) {
    pos = Math.round(Math.random() * (arr.length -1));
    str += arr[pos];
  }
  return str;
};

function verifyPercent(percent) {
  var flag = true;
  if(!percent) {
    flag = false;
  } else if(typeof(percent) == 'string') {
    percent = parseInt(percent);
    if(!(percent >= 0 && percent <= 100)) {
      flag = false;
    } 
  } if(typeof(percent) === 'number') {
    if(!(percent >= 0 && percent <= 100)) {
      flag = false;
    }     
  } else {
    flag = false;
  }
  return flag;
}



Template.orderEdit.events({
  /*经营范围*/
  'click .addR': function () {
    var data = {}
    var scopeView = Blaze.toHTMLWithData(Template.addRange || "", data);
    $(scopeView).modal({
     allowMultiple: true,
     onShow: function () {
      $(".menu .item").tab();
      $(".tab .item").click(function () {
       var item= $(this).text().trim();
       var content = $(this).data('content').trim().split(',') || [];
       var industryBig = $(this).data('industrybig').trim() || "";

       var contentLength = content.length;
       var contentArray = [];
       for(var i = 0; i < contentLength; i++) {
        contentArray.push({name: content[i]});
      }

      var dataDetail = {
        cate: item,
        content: contentArray
      }
      var liveView = Blaze.toHTMLWithData(Template.rDetail||"", dataDetail);
      $(liveView).modal({
        onApprove:function(){

         var contents = [];
         $(".detail-modal li").find("input").each(function(index,element){
          var smart = $(element).prop("checked");
          if(smart)
          {
            var object= $(element).closest("li").find(".contentItem").text();
            contents.push(object);
            $(element).prop("checked", false);
          }
        })
         var orderId = Session.get('orderId');
         var userId = Meteor.userId();
         var industryAddOptions = {
          userId: userId,
          orderId: orderId,
          contents: contents
        };

        Meteor.call('UpdateIndustryDetail', industryAddOptions);




      }
    }).modal('show');
    })	
}
}).modal('show');
},
/*股东信息*/
'click .addgudong': function () {

  $("#invest").modal({    
    onShow: function () {
      var object = $("#invest");
      object.find("form")[0].reset();
      $("#profileInfoError").html("");
      $("#profileInfoError").hide();
      $(".ui.dropdown").dropdown();
        // Session.set("profile", true);
        $(".profile-box").first().addClass("active").siblings().removeClass("active");
        $(".profile-box").on("click", ".selectType li", function () {
          var index = $(this).index();
          var smart = (index == 0 ? true : false);
          Session.set("profile", smart);
          $(this).addClass("active").siblings().removeClass("active");
        });
      },
      onHide: function () {
        Session.set("profile", true);
      },
      onDeny: function () {

      },
      onApprove: function () {
        var orderId = Session.get('orderId');
        var holder = {};
        var object = $("#invest");
        var oType = object.find(".selectType li");
        $(oType).each(function (index, element) {
          var object = $(element);
          if (object.hasClass('active')) {
            holder.selectType = index;
          }
        });
        holder.holderType = object.find(".selectType .active").html().trim() || "自然人";
          // 自然人信息
          if(holder.holderType === "自然人") {
            holder.sex = object.find("select[name='inSex']").val();
            holder.code = object.find("input[name='inCode']").val();
            holder.address = object.find("input[name= 'inAddress']").val();
          }
          holder.holderName = object.find("input[name='inName']").val();
          holder.moneyPercent = object.find("input[name= 'inMoneyPercent']").val();
          holder.money = object.find("input[name= 'inMoney']").val();
          var numReg = /^\d+$/
          console.log(1)

          if(holder.holderType === "自然人") {
            if(!Meteor.userId() || !orderId || !holder.holderName || !holder.code || !holder.address || !verifyPercent(holder.moneyPercent) || !holder.code.length === 18 || !holder.money.match(numReg)) {
              console.log(2)
              if(holder.code.length !== 18) {
                $("[id=profileInfoError]").html("身份证号码必须为18位,请确认后重新提交!");           
                $("[id=profileInfoError]").show();          
              } else if(!verifyPercent(holder.moneyPercent)) {
                $("[id=profileInfoError]").html("占股比例必须为0-100的数字,请确认后重新提交!");           
                $("[id=profileInfoError]").show();              
              } else if(!holder.money.match(numReg)) {
                $("[id=profileInfoError]").html("股东出资额必须为数字!");           
                $("[id=profileInfoError]").show();    
              } else {
                $("[id=profileInfoError]").html("股东信息不合法,请确认后重新提交!");           
                $("[id=profileInfoError]").show();    
              }
              return false;
            } else {
              console.log(3)
              holder.holderId = randomNumber(10);
              var holders = [];
              holders.push(holder);
              var userId = Meteor.userId();
              var options = {
                userId: userId,
                orderId: orderId,
                holders: holders
              };
              console.log(options)
              Meteor.call('OrderAddHolders', options, function(err, result) {
                if(!result || !result.status === 1) {
                  $("[id=profileInfoError]").html(result.message || "股东信息更新失败");           
                  $("[id=profileInfoError]").show(); 
                  return false;
                }
              });
            }
          } else if(holder.holderType == "企业") {
            if(!Meteor.userId() || !orderId || !holder.holderName || !verifyPercent(holder.moneyPercent) || !holder.money.match(numReg)) {
              if(!holder.money.match(numReg)) {
                $("[id=profileInfoError]").html("股东出资额必须为数字!");           
                $("[id=profileInfoError]").show();    
              } else if(!verifyPercent(holder.moneyPercent)) {
                $("[id=profileInfoError]").html("占股比例必须为0-100的数字,请确认后重新提交!");           
                $("[id=profileInfoError]").show();              
              } else {
                $("[id=profileInfoError]").html("股东信息不合法,请确认后重新提交!");           
                $("[id=profileInfoError]").show();    
              }
              return false;
            } else {
              holder.holderId = randomNumber(10);
              var holders = [];
              holders.push(holder);
              var userId = Meteor.userId();
              var options = {
                userId: userId,
                orderId: orderId,
                holders: holders
              };
              Meteor.call('OrderAddHolders', options, function(err, result) {
                if(!result || !result.status === 1) {
                  $("[id=profileInfoError]").html(result.message || "股东信息更新失败");           
                  $("[id=profileInfoError]").show(); 
                  return false;
                }
              });
            }
          } else {
            $("[id=profileInfoError]").html(result.message || "股东信息更新失败");           
            $("[id=profileInfoError]").show(); 
            return false;
          }
        }
      }).modal('show');
}
});


Template.orderEdit.events({
 'click #orderSubmit':function () {
  $("#orderEditError").hide();
  var orderId = Session.get("orderId");
  if(Meteor.userId() && orderId) {
   var options = {
    userId: Meteor.userId(),
    orderId: orderId
  }
  Meteor.call("UserCommitCheck", options, function(err, result) {
    if(err || !result || !result.status) {
      $("#orderEditError").html("信息不完整，不能最终提交!");
      $("#orderEditError").show();
    } else {
      $("#confim").modal({
        onApprove:function() {
         var orderId = Session.get("orderId");
         if(Meteor.userId() && orderId) {
          Meteor.call("UserCommitOrder", options, function(err, result) {
            if(!err && result.status) {
              Router.go("/user/order/detail?orderId=" + orderId);
            }
          });
        }
      }
    }).modal('show');

    }
  })

}  
}  
})


