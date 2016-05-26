Template.registration.onRendered(function(){
  alert('registration');
  $(".overlook").click(function(){
    $('.ui.modal.photo')
    .modal('show')
  });
  Session.set("productType","special");

  Session.set("amount",1);
  var notice = RegistrationLists.findOne().services[0].message;
  Session.set("notify",notice);
});

Template.contractusHandle.onRendered(function(){
  $(".overlook").click(function(){
    $('.ui.modal.photo')
    .modal('show')
  });
});
// var postsData = [
//   {
//     name: 'Introducing Telescope',
//     label: 'http://sachagreif.com/introducing-telescope/'
//   },
//   {
//     name: 'Meteor',
//     label: 'http://meteor.com'
//   },
//   {
//     name: 'The Meteor Book',
//     label: 'http://themeteorbook.com'
//   }
// ];
// Template.RegistrationHandle.helpers({
//   // "RegistrationLists": function() {
//   //   return RegistrationLists.find();
//   // },
//   "RegistrationLists": postsData,
//
//   "RegistrationList":function(){
//     var name = Session.get("productType");
//     return RegistrationLists.findOne({name: name});
//   },
//   "amount": function() {
//     return Session.get("amount");
//   },
//   "notify": function() {
//     return Session.get("notify");
//   }
// })

Template.RegistrationHandle.events({
  "click .typeSelect li":function(e){
    var self = $(e.currentTarget);
    var type = self.data("type");
    self.addClass("active").siblings().removeClass("active");
    Session.set("productType",type);
    $("#zoneSelect li").first().addClass("active").siblings().removeClass("active");
    var payment = RegistrationLists.findOne({name: type}).services[0].payment;
    var notice = RegistrationLists.findOne({name: type}).services[0].message;
    Session.set("amount",payment);
    Session.set("notify",notice);
  },
  "click #zoneSelect li":function(e){
    var self = $(e.currentTarget);
    var payment = $(self).attr("payment");
    Session.set("amount",payment);

    var notice = $(self).attr("message");
    Session.set("notify",notice);
  }
})
