Router.route('/orderEdit', {
  name: 'orderEdit',
  onBeforeAction: function() {
    var orderId = this.params.query.orderId;
    if(!Meteor.userId() || !orderId) {
      Router.go('/login');
    } else {
      this.next();      
    }
  },
  waitOn: function() {
    if(Meteor.userId()) {
      var orderId = this.params.query.orderId || "";  
      Meteor.subscribe('getBusinessTypeLists');
      var industryBig = Session.get('industryBig') || "";
      Meteor.subscribe('getIndustrySmall', industryBig);
      Meteor.subscribe('IndustryLists');
      return this.subscribe('orderInformation', orderId);   
    }
  },
  data: function() {
    var self = this;
    self.businessScope = [];
    var orderId = this.params.query.orderId || "";
    Session.set('orderId', orderId);

    var order = Orders.findOne({orderId: orderId});
    return {
      order: order
    }
  }

})