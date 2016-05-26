Template.header.helpers({
  "username": function() {
    if (Meteor.user()) {
      return Meteor.user().username;
    }
  }
})



Template.header.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var user = Meteor.user();
    if (user && user.hasOwnProperty("username")) {
      var username = user.username;
      console.log("This set username")
      Cookies.set('username', username);
      Session.set('username', username);
      console.log("username: " + username)
    } else {
      Cookies.remove("username");
    }
  })
})

Template.slimLayout.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var user = Meteor.user();
    if (user && user.hasOwnProperty("username")) {
      var username = user.username;
      Cookies.set('username', username);
    } else {
      Cookies.remove("username");
    }
  })
})



Template.header.events({
  "click .headerL li": function(event) {
    $(event.currentTarget).addClass('active').siblings().removeClass("active");
  }
})

//----------------------------------------------------------------------


Template.home.rendered = function() {
  setTimeout(function() {
    $('.headerL li.homeL').addClass('active').siblings().removeClass("active");
  }, 100)
}

Template.registration.rendered = function() {
  setTimeout(function() {
    $('.headerL li.serviceL').addClass('active').siblings().removeClass("active");
  }, 100)
}

//----------------------------------------------------------------------
Template.finance.rendered = function() {
  setTimeout(function() {
    $('.headerL li.financeL').addClass('active').siblings().removeClass("active");
  }, 100)
}

//----------------------------------------------------------------------
Template.bank.rendered = function() {
  setTimeout(function() {
    $('.headerL li.serviceL').addClass('active').siblings().removeClass("active");
  }, 100)
}

//----------------------------------------------------------------------
Template.assurance.rendered = function() {
  setTimeout(function() {
    $('.headerL li.serviceL').addClass('active').siblings().removeClass("active");
  }, 100)
};

Template.bookkeeping.rendered = function() {
  setTimeout(function() {
    $('.headerL li.serviceL').addClass('active').siblings().removeClass("active");
  }, 100)
};

Template.space.rendered = function() {
  setTimeout(function() {
    $('.headerL li.serviceL').addClass('active').siblings().removeClass("active");
  }, 100)
};


Template.solution.rendered = function() {
  setTimeout(function() {
    $('.headerL li.solutionL').addClass('active').siblings().removeClass("active");
  }, 100)
};

Template.checkname.rendered = function() {
  setTimeout(function() {
    $('.headerL li.toolsL').addClass('active').siblings().removeClass("active");
  }, 100)
};

Template.shopcart.rendered = function() {
  setTimeout(function() {
    $('.headerL li.serviceL').addClass('active').siblings().removeClass("active");
  }, 100)
};


// Template.usercenter.rendered = function() {
//   $('.usercenterL li.ordersL').addClass('active').siblings().removeClass("active");
// };

// Template.userOrders.rendered = function() {
//   $('.usercenterL li.ordersL').addClass('active').siblings().removeClass("active");
// };

// Template.UserProfile.rendered = function() {
//   $('.usercenterL li.ordersL').addClass('active').siblings().removeClass("active");
// };