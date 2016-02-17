
Template.companyName.events({
  'click #companyName': function(event) {
    var mainName = $('#mainName').val().trim() || "";
    var alternativeName1 = $('#alternativeName1').val().trim() || "";
    var alternativeName2 = $('#alternativeName2').val().trim() || "";
    var alternativeName3 = $('#alternativeName3').val().trim() || "";
    var alternativeName4 = $('#alternativeName4').val().trim() || ""; 
    var orderId = Session.get('orderId');
    var userId = Meteor.userId();
    if(Meteor.userId() && orderId && mainName) {
      var options = {
        userId: userId,
        orderId: orderId,
        companyName: {
          mainName: mainName,
          alternativeName1: alternativeName1,
          alternativeName2: alternativeName2,
          alternativeName3:alternativeName3,
          alternativeName4: alternativeName4
        }
      }

      Meteor.call('UpdateCompanyName', options, function(err) {
        if(err) {
          $("[id=nameError]").html("字号提交失败!");           
          $("[id=nameError]").show();
        } else {
          $("[id=nameSuccess]").html("字号提交成功!");           
          $("[id=nameSuccess]").show();
        }
      })
    } else {
      $("[id=nameError]").html("字号提交失败,确认后请重新提交!");           
      $("[id=nameError]").show();
    }
  }, 
  'focus input': function(event) {
    $("[id=nameError]").hide();
    $("[id=nameSuccess]").hide();
  }
})

