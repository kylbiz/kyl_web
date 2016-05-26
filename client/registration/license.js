//
Template.license.onRendered(function() {
  var licenseType = $(".licensetype li.active").attr("data-license") || "";
  Session.set("licenseType", licenseType);
  $("#licenseError").hide();

  setTimeout(function() {
    $(".licenszone li").first().addClass("active").siblings().removeClass("active");
    var payment =  $(".licenszone li").first().attr("data-payment") || 0;
    var zone = $(".licenszone li").first().attr("data-zone") || "";
    Session.set("liceseZone", zone);
    Session.set("payment", payment);
  }, 100);


  $(".ui.modal").on("click",".licensetype li",function(){
    $(this).addClass("active").siblings().removeClass("active");
    Session.set("licenseType", $(this).attr("data-license"));
    $("#licenseError").hide();
    setTimeout(function() {
      $(".licenszone li").first().addClass("active").siblings().removeClass("active");
      var payment =  $(".licenszone li").first().attr("data-payment") || 0;
      var zone = $(".licenszone li").first().attr("data-zone") || "";
      Session.set("liceseZone", zone);
      Session.set("payment", payment);
    }, 100);

  });

  $(".ui.modal").on("click",".licenszone li",function(){
    $(this).addClass("active").siblings().removeClass("active");
    var payment = $(this).attr("data-payment") || 0;
    var zone = $(this).attr("data-zone") || "";
    Session.set("liceseZone", zone);
    Session.set("payment", payment);
    $("#licenseError").hide();
  });
})


Template.license.helpers({
  "licenseTypeLists": function() {
    var licenseType = Session.get("licenseType") || "urban";
    return  LicenseLists.findOne({type: licenseType});
  },
  // "licenseTypeLists": postsData,

  "paymentL": function() {
    return Session.get("payment") || 0;
  }
})


Template.license.events({
 "click #go":function(){
    //模态框
    $("#licenseModal").modal({
      onShow: function () {
        if(Session.set("region")) {
          $("#toggle li").eq(1).addClass("active").siblings().removeClass("active");
        }
        else {
          $("#toggle li").eq(0).addClass("active").siblings().removeClass("active");
        }
      },
      onApprove: function () {
        if(!Meteor.user()) {
          UserHandle();
        } else {
          var liceseZone = Session.get("liceseZone") || "";
          var licensePayment = Session.get("payment") || 0;

          if(liceseZone.length >=2 && licensePayment) {
            var userId = Meteor.userId();
            var services = [
              {
                productType: '三证执照',
                typeNameFlag: 'license',
                moneyAmount: licensePayment,
                servicesNameList: [
                  {
                    name: '三证执照[' + liceseZone + ']',
                    money: licensePayment,
                    scale: 1,
                    zone: liceseZone,
                    servicesContains: [
                      {name: '三证执照'}
                    ]
                  }
                ]
              }
            ];

            Meteor.call('shopcartAdd', services, function (err) {
              if (err) {
                $("[id=bankError]").html("加入购物车失败!");
                $("[id=bankError]").show();

              } else {
                Router.go('/shopcart');
              }
            });

          } else {
            $("#licenseError").html("请选择区域！");
            $("#licenseError").show();
            return false;
          }
        }

		  }
    }).modal('show');
 }
});
