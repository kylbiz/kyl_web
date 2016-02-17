Router.route('/login', {
  name: 'login',
  onBeforeAction: function() {
    var redirect = this.params.query.redirect || "/";
    Session.set('loginRedirect', redirect);
    if(Meteor.userId()) {
      Router.go(redirect);
    } else {
      this.layout('slimLayout');           
      this.next();      
    }
  }  
});

//------------------------------------

Router.route('/register', {
  name: 'register',
  onBeforeAction: function() {
    if(Meteor.userId()) {
      Router.go('/');
    } else {
      this.layout('slimLayout');      
      this.next();      
    }
  }  
});

Router.route('/password', {
  name: 'forgetPwd'
})


Router.route('/logout', {
  name: "logout",
  onBeforeAction: function() {
    if(Meteor.user()) {
      Meteor.logout(function(err) {
        if(err) {
          alert("退出登录失败，请重新退出")
        } else {
          Cookies.remove("username")
          Router.go("/");
        }
      })
    } else {
      Router.go("/");
    }
  }
})
