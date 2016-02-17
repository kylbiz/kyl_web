Router.route('/user/message',{
  name: 'usercenter',
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('/login');
    } else {
      this.next();      
    }
  },
  subscriptions: function() {
    if(Meteor.userId() && Meteor.user()) {
      var username = Meteor.user().username;
      this.subscribe('messagesLists', username);      
    }
  },
  waitOn:  function() {
    if(Meteor.userId() && Meteor.user()) {
      var username = Meteor.user().username;
      return Meteor.subscribe('messagesLists', username);      
    }    
  },
  data: function() {
    if(Meteor.userId() && Meteor.user()) {
      var username = Meteor.user().username;
      var MessagesRead = Messages.find({username: username, read: true});
      var MessagesUnread = Messages.find({username: username, read: false});
      return {
        MessagesRead: MessagesRead,
        MessagesUnread: MessagesUnread
      }      
    }    
  }
});

//---------------------------------------------

Router.route('/user/message/detail', {
  name: 'messageDetail',
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('/login');
    } else {
      this.next();      
    }
  },   
  subscriptions: function() {
    if(Meteor.userId()) {
      var mid = this.params.query.mid || '';
      return Meteor.subscribe('messageDetail', mid);      
    }
  },
  waitOn: function() {
    if(Meteor.userId()) {
      var mid = this.params.query.mid || '';
      return this.subscribe('messageDetail', mid);      
    }
  },
  data: function() {
    var mid = this.params.query.mid || '';
    return Messages.findOne({_id: mid});
  }
});



//---------------------------------------------
Router.route('/user/profile',{
  name: 'UserProfile',
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('/login');
    } else {
      this.next();      
    }
  },   
  data: function() {
    return Meteor.user();
  } 
});

//---------------------------------------------

Router.route('/user/orders',{
  name: 'userOrders',
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('/login');
    } else {
      this.next();      
    }
  },  
  subscriptions: function() {
    if(Meteor.userId()) {
      return Meteor.subscribe('orderLists', Meteor.userId());      
    }
  },
  waitOn: function() {
    if(Meteor.userId()) {
      return this.subscribe('orderLists', Meteor.userId());      
    }
  }, 
  data: function() {
    if(Meteor.userId()) {
      var orders = Orders.find({
        userId: Meteor.userId()
      });
      return {
        orders: orders
      };     
    }
  } 
});

//---------------------------------------------
function isInteger(value) {
  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;  
}



function handleProportion(numerator, denominator) {
  var num = numerator * 100 / denominator;
  if(isInteger(num)){
    return num + '%';
  }else {
    return num.toFixed(2) + '%';
  }
}




Router.route('/user/order/detail', {
  name: 'orderDetails',
  onBeforeAction: function() {
    var orderId = this.params.query.orderId;
    if(!Meteor.userId() || !orderId) {
      Router.go('/login');
    } else {
      this.next();      
    }
  },
  subscriptions: function() {
    if(Meteor.userId()) {
      var orderId = this.params.query.orderId || "";
      Meteor.subscribe('orderInformation', orderId); 
//      Meteor.subscribe('getUserAddress', Meteor.userId());     
    }
  },
  waitOn: function() {
    if(Meteor.userId()) {
      var orderId = this.params.query.orderId || "";
       this.subscribe('orderInformation', orderId);   
       this.subscribe('orderInformation', Meteor.userId());   
    }
  },
  data: function() {
    var orderId = this.params.query.orderId || "";
    Session.set('orderId', orderId);
    var order = Orders.findOne({orderId: orderId});
    if(order) {
      if(order.typeNameFlag === 'registration') {
        var status = order.productProgress.status || 0;
        Session.set("productProgressStatus", status);
      }

      var createTime = order.createTime;
      order.createTime = moment(createTime).format('YYYY-MM-DD:hh:mm:ss');

      if(order.hasOwnProperty('holders')) {
        var holders = order.holders;
        var allMoney = 0;
        holders.forEach(function(holder) {
          allMoney += parseInt(holder.money);
        });
				allMoney = allMoney > 0 ? allMoney : 1;
        var length = order.holders.length;
        for(var i = 0; i < length; i++) {
          order.holders[i].percent = handleProportion(parseInt(order.holders[i].money), allMoney);
        }
      }
			return {
				order: order
			}

    } 
  }
})


//---------------------------------------------



//---------------------------------------------


//---------------------------------------------










