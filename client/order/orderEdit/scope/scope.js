Template.scope.events({
  'click #scopeEdit': function() {
    var orderId = Session.get('orderId');
    var contents=[];
    $("#dataTable").find(".check-control").each(function(index,element){
      var smart=$(element).prop("checked");
      if(smart)
      {
        content=$(element).closest(".td").text().trim();
        contents.push(content);
      }
    });
    var userId = Meteor.userId();
    var scopeEditOptions = {
      orderId: orderId,
      userId:userId,
      contents: contents
    };

    Meteor.call('EditScope', scopeEditOptions, function(err) {
      $("#dataTable").find("input").prop('checked', true);    
      $("#scopeSuccess").html("经营范围修改成功");
      $("#scopeSuccess").show();
    });
  },
  'click #dataTable input': function(event) {
    $("#scopeSuccess").hide();
  }
})


