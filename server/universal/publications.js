
Meteor.publish('userInfos', function(uid) {
  return Meteor.users.find({uid: uid});
})

Meteor.publish("whoami", function() {
  return Meteor.user();
})

Meteor.publish("getSeo", function(type) {
  return Seo.find({type: type});
})

Meteor.publish('messagesLists', function(username) {
  return Messages.find({username: username});
})

Meteor.publish('messageDetail', function(mid) {
  return Messages.find({_id: mid});
})


Meteor.publish('orderLists', function(userId) {
  return Orders.find({userId: userId},{sort: {createTime: -1}});
})


Meteor.publish('registrationLists', function(type) {
  return RegistrationLists.find({type: type});
})

Meteor.publish('assuranceLists', function() {
  return AssuranceLists.find();
})

Meteor.publish('bookkeepingTypeLists', function() {
  return BookkeepingLists.find();
})

Meteor.publish('licenseTypeLists', function() {
  return LicenseLists.find();
})



Meteor.publish('getUserAddress', function(userId) {
  return UserAddress.find({userId: userId});
})

Meteor.publish('addressDetail', function(addressId) {
  return UserAddress.find({_id: addressId});
})


Meteor.publish('getBusinessTypeLists', function() {
  return BusinessTypeLists.find({});
})


Meteor.publish('getIndustrySmall', function(industryBig) {
  industryBig = industryBig || "";
  return Business.find({industryBig: industryBig});
})


Meteor.publish('financeTypeLists', function() {
  return FinanceLists.find();
})


Meteor.publish('getFinance', function(financeTypeId) {
  return FinanceLists.find({_id: financeTypeId});
})

Meteor.publish('orderInformation', function(orderId) {
  return Orders.find({orderId: orderId, payed: true});
})

Meteor.publish('IndustryLists', function() {
  return Business1.find({});
})


Meteor.publish('getShopCart', function(userId) {
 	return ShopCart.find({
		userId: userId,
    payed: false
	});
})



