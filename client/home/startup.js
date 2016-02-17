Meteor.startup(function() {
  if (Meteor.isClient) {
    if (!Meteor.user()) {
      console.log("Hi, I will remove cookies");
      Cookies.remove("username");
    } else {
      console.log("Hi, I will set cookies");
      var username = Meteor.user().username;
      Cookies.set('username', username);
    }
    // 下面是生成首页html 的接口
    // var body = Blaze.toHTML(Template.indexlayout);
    // Meteor.call("generateindex", body);
  }
})