Router.route('solution', {
  name: 'solution',
  onBeforeAction: function() {
    var v = this.params.query.v || 0;
    Session.set('v', v);
    this.next();
  }

});



Router.route('space');
Router.route('aboutus')
Router.route('joinus')
Router.route('contactus')
Router.route('channel')

Router.route('support')

Router.route('activity',{
  name:'activity',
  onBeforeAction: function() {
    this.layout('oLayout');
    this.next();   
  }
});
