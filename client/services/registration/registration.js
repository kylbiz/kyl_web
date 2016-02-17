Template.registration.onRendered(function(){
  $(".overlook").click(function(){
    $('.ui.modal.photo')
    .modal('show')
  });
});

Template.contractusHandle.onRendered(function(){
  $(".overlook").click(function(){
    $('.ui.modal.photo')
    .modal('show')
  });
});

Template.RegistrationHandle.helpers({
  "RegistrationList": function() {
    var productTypeName = Session.get("productTypeName");
    return RegistrationLists.findOne({type: productTypeName});
  }
})

