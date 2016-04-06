Router.route('/assurance', {
	name: 'assurance',
	subscriptions: function () {
		Meteor.subscribe('assuranceLists');
	},
	waitOn: function () {
   //  var assuranceType = Session.get("assuranceType") || "account";
   //  if(assuranceType === "account") {
   //    Session.set("bacheloractivity", true);
   //  } else {
   //   Session.set("bacheloractivity", false);
   // }
   return this.subscribe('assuranceLists');
 },
 data: function () {
  // var assuranceType = Session.get("assuranceType") || "account";
  // if(assuranceType === "account") {
  //   Session.set("bacheloractivity", true);
  // } else {
  //  Session.set("bacheloractivity", false);
  // }
 var assuranceLists = AssuranceLists.find();
 return {
   assuranceLists: assuranceLists
 }
}
})

//---------------------------------------------
Router.route('/finance', {
	name: 'finance',
  waitOn: function() {
    return Meteor.subscribe("financeTypeLists");
  },
  onBeforeAction: function () {
    Session.set("financeType", "");
    Session.set("benchmark", 0);
    Session.set("datetimeRange", 0);
    this.next();
  }
});

//---------------------------------------------

Router.route('/bank', {
  name: 'bank',
  waitOn: function () {
    return Meteor.subscribe("bankLists");
  },
  onBeforeAction: function () {
    Session.set('payment', 0);
    this.next();
  }
});
Router.route('/bookkeeping',{
  name: 'bookkeeping',
  subscriptions: function() {
    return Meteor.subscribe("bookkeepingTypeLists");
  }
});
//---------------------------------------------


Router.route('/confirm', {
  name: 'confirm',
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('/login');
    } else {
      this.next();
    }
  },
  subscriptions: function() {
    Meteor.subscribe('getUserAddress', Meteor.userId());
  },
  data: function() {
    var userAddresses = UserAddress.find({userId: Meteor.userId()});
    var self = this;
    self.productTypes = [];
    self.moneyAmount = 0;
    self.moneyList = [];
    self.isMainProductList = [];
    var services = JSON.parse(decodeURIComponent(this.params.query.services));
    var isRegistration = this.params.query.isRegistration || false;
    if(services instanceof Array) {
      var zone = services[0]['zone'];
      services.forEach(function(service) {
        self.productTypes.push(service['productType']);
        self.moneyAmount += parseInt(service['moneyAmount']);
        self.moneyList.push(parseInt(service['moneyAmount']));
        self.isMainProductList.push(service['isMainProduct']);
      });
      return {
        zone: zone,
        isRegistration: isRegistration,
        servicesList: self.productTypes,
        moneyList: self.moneyList,
        isMainProductList: self.isMainProductList,
        services: services,
        moneyAmount: self.moneyAmount,
        userAddresses: userAddresses,
        addressCount: userAddresses.count()
      }
    }

  }
})

//---------------------------------------------


