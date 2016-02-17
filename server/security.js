//------------------------------------------------
var isValidObject = function(obj, properties) {
  var length = properties.length;
  var flag = true;
  for (var i = 0; i < length; i++) {
    if (!obj.hasOwnProperty(properties[i])) {
      flag = false;
      break;
    }
  }
  return false;
  // return flag;
}




//------------------------------------------------
// 用户安全验证
Security.permit(['insert', 'update']).collections([
  Meteor.users
]).never().apply();

//------------------------------------------------
// Registration 数据库只允许平台的更新
Security.defineMethod("isHasCompanyQueryId", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId, doc) {
    console.log(arguments)
    return !doc.hasOwnProperty("companyQueryId");
  }
})

Registration.permit("update").isHasCompanyQueryId().apply();
//------------------------------------------------
// Orders 订单表规则

Security.defineMethod("ifHasOrderId", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId, doc, fields, modifier) {
    return (userId !== doc.userId || !doc.hasOwnProperty("orderId"));
  }
});

Security.defineMethod("isValidOrder", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId, doc, fields, modifier) {
    var properties = ['userId', 'orderId', 'host', 'moneyAmount', 'productType']
    return !doc.hasOwnProperty("host") || !doc.hasOwnProperty("orderId") || !doc.hasOwnProperty("userId") || !doc.hasOwnProperty("moneyAmount") || !doc.hasOwnProperty("productType");
  }
});


Orders.permit(["insert"]).ifLoggedIn().isValidOrder().apply();

Orders.permit("update").ifLoggedIn().ifHasOrderId().apply();
//------------------------------------------------
// 购物车数据库规则
Security.defineMethod("isValidShopCart", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId, doc, fields, modifier) {
    return !doc.hasOwnProperty("userId") || !doc.hasOwnProperty("moneyAmount") || !doc.hasOwnProperty("productType");
  }
});

Security.defineMethod("ifHasRelationId", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId, doc) {
    return !doc.hasOwnProperty("userId") || !doc.hasOwnProperty("relationId");
  }
});


ShopCart.permit("insert").ifLoggedIn().isValidShopCart().apply();

ShopCart.permit("remove").ifLoggedIn().ifHasRelationId().apply();


ShopCart.permit("update").ifLoggedIn().apply();

//------------------------------------------------
// PayLogs 支付记录

Security.defineMethod("isValidPayLog", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId, doc) {
    return !doc.hasOwnProperty("userId") || !doc.hasOwnProperty("openid") || !doc.hasOwnProperty("moneyAmount");
  }
});

Security.defineMethod("ifHasOpenId", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId, doc) {
    return !doc.hasOwnProperty("userId") || !doc.hasOwnProperty("openid");
  }
});



PayLogs.permit("insert").ifLoggedIn().isValidPayLog().apply();


PayLogs.permit("update").ifLoggedIn().ifHasOpenId().apply();

//------------------------------------------------
// UserAddress 用户地址规则
UserAddress.permit(["insert", "update", "remove"]).ifLoggedIn().apply();
//------------------------------------------------

FinanceLists.permit(['insert', 'update', 'remove']).never().apply();

Messages.permit(['insert', 'update', 'remove']).never().apply();

Seo.permit(['insert', 'update', 'remove']).never().apply();

AssuranceLists.permit(['insert', 'update', 'remove']).never().apply();

Business.permit(['insert', 'update', 'remove']).never().apply();

Business1.permit(['insert', 'update', 'remove']).never().apply();

BusinessTypeLists.permit(['insert', 'update', 'remove']).never().apply();


BookkeepingLists.permit(['insert', 'update', 'remove']).never().apply();

//------------------------------------------------