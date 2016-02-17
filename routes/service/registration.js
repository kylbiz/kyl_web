
Router.map(function() {
  return this.route('registration', {
    path: '/registration/:type',
    subscriptions: function() {
      Session.set("productTypeName", this.params.type)
      Meteor.subscribe("getSeo",  this.params.type);    
      return Meteor.subscribe('registrationLists', this.params.type || ""); 
    },
    waitOn: function() {
      Session.set("productTypeName", this.params.type)
      Meteor.subscribe("getSeo",  this.params.type);   
      return this.subscribe('registrationLists', this.params.type || "");   
    },
    data: function() {
      var seo = Seo.findOne({type: this.params.type}) || {};
      Session.set("seo", seo);
      return {
        seo: seo
      }
    },
    onAfterAction: function() {
      if (!Meteor.isClient) {
        return;
      };
      var seo = Session.get("seo");
      if(seo) {
        SEO.set({
          title: seo.title || "开业啦极速公司注册",
          meta: {
            'description': seo.description,
            'keywords': seo.keywords
          }
        })        
      }
    }
  })
})

