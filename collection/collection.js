LicenseLists = new Meteor.Collection("LicenseLists");

UserCode = new Meteor.Collection('UserCode');

Messages = new Meteor.Collection('Messages');

Orders = new Meteor.Collection('Orders');

Registration = new Meteor.Collection('Registration');

// RegistrationLists = new Meteor.Collection('RegistrationLists');
RegistrationLists = new Meteor.Collection('CompanyRegist'); //(与微信统一)替换成新的注册产品 by air_cc @2016-04-05

UserAddress = new Meteor.Collection('UserAddress');

AssuranceLists = new Meteor.Collection('AssuranceLists');

AdsLists = new Meteor.Collection("AdsLists");

Business = new Meteor.Collection('Business');

Business1 = new Meteor.Collection('Business1');

BusinessTypeLists = new Meteor.Collection('BusinessTypeLists');

// FinanceLists = new Meteor.Collection('FinanceLists');
FinanceLists = new Meteor.Collection('FinanceAgent'); //(与微信统一)替换成新的财务产品 by air_cc @2016-04-05

// 银行开户
BankLists = new Meteor.Collection('BankLists_wechat'); //

BookkeepingLists = new Meteor.Collection('BookkeepingLists');

PayLogs = new Meteor.Collection('PayLogs');

ShopCart = new Meteor.Collection('ShopCart');

CompanySearchRecords = new Meteor.Collection('CompanySearchRecords');

Seo = new Meteor.Collection('Seo');

Orders.helpers({
	createTimeL: function () {
		if (this.createTime) {
			return moment(this.createTime).format("YYYY年MM月DD日 H:mm");
		} else {
			return null;
		}
	},
  "isRegistration": function() {
    return this.typeNameFlag === "registration";
  },
  "isFinance": function() {
    return (this.typeNameFlag === "finance" || this.typeNameFlag === "bank" || this.typeNameFlag === "bookkeeping");
  },
  isAssurance: function() {
    return this.typeNameFlag === "assurance";
  },
  invoiceL: function() {
    if(this.hasOwnProperty('invoice') && (this.invoice == true || this.invoice == "true")) {
      return "是";
    } else {
      return "否";
    }
  }
});

ShopCart.helpers({
  "productTypeL": function() {
    var typeNameFlag = this.typeNameFlag;
    var productTypeL = 'registration.png';
    switch(typeNameFlag) {
      case 'registration':
        productTypeL = 'registration.png';
        break;
      case 'finance':
      case 'bank':
      case 'bookkeeping':
        productTypeL = 'finance.png';
        break;
      case 'assurance':
        productTypeL = 'assurance.png';
        break;
      case 'license':
        productTypeL = 'license.jpg';
        break;
      default:
        productTypeL = 'registration.png';
        break;
    }
    return productTypeL;
  }
})



