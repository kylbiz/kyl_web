Router.onBeforeAction(function(){
  $(window).scrollTop(0);
  this.next();
})

Router.configure({
  layoutTemplate: 'basicLayout',
  notFoundTemplate: 'notFound'
});



// Router.route('home', {
//   path: '/',
//   onBeforeAction: function() {
//     Router.go('/index.html');
//   },
//   subscriptions: function() {
//     var type = 'home';
//     Meteor.subscribe("getSeo", type);    
//   },
//   waitOn: function() {
//     var type = 'home';
//     Meteor.subscribe("getSeo", type);   
//   },
//   data: function() {
//    var type = 'home';
//    var seo = Seo.findOne({type: type}) || {};
//    Session.set("seo", seo);
//    return {
//     seo: seo
//   }
// },
// onAfterAction: function() {
//   if(!Meteor.isClient) {
//     return;
//   }
//   var seo = Session.get("seo");
//   if(seo) {
//     SEO.set({
//       title: seo.title || "开业啦极速公司注册",
//       meta: {
//         'description': seo.description,
//         'keywords': seo.keywords
//       }
//     })        
//   }
// }
// })
