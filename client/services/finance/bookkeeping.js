Template.BookkeepingMenu.rendered = function() {
  $("#financeTag").addClass('active').siblings().removeClass("active");
}

Template.BookkeepingHandle.rendered = function () {

  var bookkeepingType = $('.bookkeepingType li.active').attr('data-bookeeping');
  Session.set('bookkeepingType', bookkeepingType);

  setTimeout(function(){
    $(".bookkeepingService li").first().addClass("active").siblings().removeClass("active");
    var description = $(".bookkeepingService li").first().attr("data-description");
    var payment = $(".bookkeepingService li").first().attr("data-payment");
    Session.set("description", description);
    Session.set("payment", payment);
  }, 200);
}


Template.BookkeepingHandle.helpers({
  "BookkeepingLists": function() {
    var bookkeepingType = Session.get("bookkeepingType");
    return BookkeepingLists.findOne({bookkeepingType: bookkeepingType});
  }, 
  "descriptionL": function() {
    return Session.get("description");
  },
  "paymentL": function() {
    return Session.get("payment");
  }
});

Template.BookkeepingHandle.events({
  "click .bookkeepingType li": function(event) {
    $(event.currentTarget).addClass("active").siblings().removeClass("active");
    var bookkeepingType = $(event.currentTarget).attr("data-bookeeping");
    Session.set("bookkeepingType", bookkeepingType);
    setTimeout(function() {
      var payment = $('.bookkeepingService li.active').attr('data-payment');
      Session.set("payment", payment);
    }, 200);
  }
})

Template.BookkeepingHandle.events({
  "click .bookkeepingService li": function(event) {
    $(event.currentTarget).addClass("active").siblings().removeClass("active");
    var description = $(event.currentTarget).attr("data-description");
    var payment = $(event.currentTarget).attr("data-payment");
    Session.set("description", description);
    Session.set("payment", payment);
  } 
})


Template.BookkeepingHandle.events({
  "click #buy": function(event) {
    if(!Meteor.userId()) {
      UserHandle();
    } else {
      var bookkeepingType = $(".bookkeepingType li.active").html() || "";
      var bookkeepingService = $(".bookkeepingService li.active").attr("data-service");
      var payment = $(".bookkeepingService li.active").attr("data-payment");
      var services = [];

      if(!bookkeepingType || !bookkeepingService || !payment) {
        $("[id=bookkeepingError]").html("请选择服务!");
        $("[id=bookkeepingError]").show();
      } else {
        services = [
          {
            productType: "流量记账包服务套餐",
            typeNameFlag: "bookkeeping",
            moneyAmount: payment,
            servicesNameList: [
              {
                name: bookkeepingType + '[' + bookkeepingService + ']',
                money: payment,
                scale: 1,
                servicesContains: [
                  {name: bookkeepingService}
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
      }

    }
  }
})
