Template.holder.events({
  "click .close": function(event) {
    var holderId = $(event.currentTarget).data("holderid");
    var orderId = Session.get("orderId");
    var userId = Meteor.userId();
    if (orderId && holderId && userId) {
      var options = {
        userId: userId,
        orderId: orderId,
        holderId: holderId
      };
      Meteor.call('deleteHolder', options);
    }
  }
});

Template.profileInfo.helpers({
  "profile": function() {
    return Session.get("profile") || false;
  }
})


Template.moneyAmount.events({
  "focus .submitMoneyAmount": function(event) {
    $("#moneyAmountSuccess").hide();
    $("#moneyAmountError").hide();
  },
  "click .submitMoneyAmount": function(event) {
    var orderId = Session.get("orderId");
    var userId = Meteor.userId();
    var moneyAmount = $("#moneyAmount").val() || 0;
    if (userId && orderId && moneyAmount) {
      var options = {
        userId: userId,
        orderId: orderId,
        companyMoney: moneyAmount
      };

      Meteor.call("UpdateCompanyMoney", options, function(err, result) {
        if (result && result.status === 0) {
          $("#moneyAmountError").html(result.message || "修改注册资本失败");
          $("#moneyAmountError").show();
        } else if (result && result.status === 1) {
          $("#moneyAmountSuccess").html("修改注册资本成功");
          $("#moneyAmountSuccess").show();
        }
      })
    }
  }
})