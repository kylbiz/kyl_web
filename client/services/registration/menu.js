Template.RegistrationTypeList.onRendered(function() {
  Session.set("others", false);
  setTimeout(function() {
    var productTypeName = Session.get("productTypeName");
    if(productTypeName === "qita") {
      Session.set("others", true);
    }
  }, 100)
});


Template.registration.helpers({
  "otherHandle": function() {
    return Session.get("others");
  }
})

Template.RegistrationHandle.helpers({
  "imgURI": function() {
    var productTypeName = Session.get("productTypeName");

    var imgURI = 'registration';
    switch (productTypeName) {
      case 'year2016':
        imgURI += '14.jpg';
        break;
      case 'touzi':
        imgURI += '15.png';
        break;
      case 'jisu':
        imgURI += '04.jpg';
        break;
      case 'dianshang':
        imgURI += '05.jpg';
        break;
      case 'jiaoyu':
        imgURI += '06.jpg';
        break;
      case 'jinrong':
        imgURI += '07.jpg';
        break;
      case 'yidong':
        imgURI += '08.jpg';
        break;
      case 'wenhua':
        imgURI += '09.jpg';
        break;
      case 'shangwu':
        imgURI += '10.jpg';
        break;
      case 'jianzhu':
        imgURI += '11.jpg';
        break;
      case 'yiliao':
        imgURI += '12.jpg';
        break;
      case 'qita':
        imgURI += '13.jpg';
        break;
      default:
        imgURI += '04.jpg';
        break;
    }
    return imgURI;
  }
})

//----------------------------------------------------------------------

Template.serviceList.rendered = function() {
  $(".oMenu .grid .column").click(function() {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    if (index == 0)
      $(".oMenu .tab-pane").addClass("active");
    else
      $(".oMenu .tab-pane").removeClass("active");
    window.location.href = $(this).find('a').attr("href");
  });
};

//----------------------------------------------------------------------
Template.RegistrationTypeList.onRendered(function() {
  setTimeout(function() {
    $('.zoneSelect li').first().addClass('active').siblings().removeClass('active');
    Session.set('zone', $('.zoneSelect li').first().html());
    Session.set('payment', $('.zoneSelect li').first().attr('data-payment'));
    Session.set("message", $('.zoneSelect li').first().attr('data-message'));
  }, 400)
});

//----------------------------------------------------------------------

Template.RegistrationTypeList.events({
  'click .productTypeName li.typeName': function(event, template) {
    Session.set("others", false);
    var rgistrationType = event.currentTarget;
    $(rgistrationType).addClass("active").siblings().removeClass("active")
    setTimeout(function() {
      $('.zoneSelect li').first().addClass('active').siblings().removeClass('active');
      Session.set('zone', $('.zoneSelect li').first().html());
      Session.set('payment', $('.zoneSelect li').first().attr("data-payment"));
      Session.set('message', $('.zoneSelect li').first().attr("data-message"));
    }, 100)
  }
});

Template.RegistrationTypeList.events({
  "click .productTypeName li.others": function(event) {
    Session.set("others", true);
    $(event.currentTarget).addClass("active").siblings().removeClass("active");
  }
})

//----------------------------------------------------------------------

Template.RegistrationHandle.events({
  'click .zoneSelect li': function(event, template) {
    var zoneHtml = event.currentTarget;
    $(zoneHtml).addClass("active").siblings().removeClass("active");
    setTimeout(function() {
      var zone = $(zoneHtml).html();
      Session.set('zone', zone);
      Session.set("payment", $(zoneHtml).attr("data-payment"));
      Session.set("message", $(zoneHtml).attr("data-message"));
      $("[id=zoneError]").hide();
    }, 100)
  }

});
//----------------------------------------------------------------------

Template.RegistrationHandle.helpers({
  "paymentL": function() {
    return Session.get("payment");
  },
  "messageL": function() {
    return Session.get("message");
  }
});

Template.RegistrationTypeList.helpers({
  productTypeName: function() {
    return Session.get("productTypeName");
  }
})


//----------------------------------------------------------------------

Template.RegistrationHandle.events({
  //添加购物车
  "click #buy": function(event, template) {
    if (Meteor.userId()) {
      var zone = $('.zoneSelect li.active').html();
      var cnProductTypeName = $(".typeName.active").find("a").html() || "公司注册";
      if (zone && cnProductTypeName) {
        var services = [];
        var productType = '公司注册';
        var productTypeName = cnProductTypeName;
        var moneyAmount = $("#moneyAmount").html();
        var baseService = $("#baseService").html();
        if (zone && baseService && productTypeName && moneyAmount) {
          services = [{
            productType: productType,
            typeNameFlag: 'registration',
            moneyAmount: moneyAmount,
            servicesNameList: [{
              name: productTypeName + '[' + zone + ']',
              money: moneyAmount,
              scale: 1,
              zone: zone,
              servicesContains: [{
                name: baseService
              }]
            }]
          }];

          Meteor.call('shopcartAdd', services, function(err) {
            if (err) {
              $("[id=orderError]").html("加入购物车失败!");
              $("[id=orderError]").show();

            } else {
              Router.go('/shopcart')
            }
          });
        }

      } else {
        $("[id=orderError]").html("请选择注册区域");
        $("[id=orderError]").show();
      }
    } else {
      UserHandle();
    }
  }
})

//----------------------------------------------------------------------