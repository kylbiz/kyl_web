Router.route('/paylogs', {
  name: "paylogs",
  waitOn: function() {
    return this.subscribe("getPayLogs");
  }
})



