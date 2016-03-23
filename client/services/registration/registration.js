Template.registration.onRendered(function(){
  $(".overlook").click(function(){
    $('.ui.modal.photo')
    .modal('show')
  });
  Session.set("productType","sepical");
});

Template.contractusHandle.onRendered(function(){
  $(".overlook").click(function(){
    $('.ui.modal.photo')
    .modal('show')
  });
});

Template.RegistrationHandle.helpers({
  "RegistrationLists": function() {
    return RegistrationLists.find();
  },
  "RegistrationList":function(){
    var type = Session.get("productType");
    return RegistrationLists.findOne({type: type});
  }
})

Template.RegistrationHandle.events({
  "click .typeSelect li":function(e){
    var self = $(e.currentTarget);
    var type = self.data("type"); 
    self.addClass("active").siblings().removeClass("active");
    Session.set("productType",type);    
    $(".zoneSelect li").first().addClass("active").siblings().removeClass("active");
  }
})