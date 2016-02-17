

Meteor.subscribe('webInquiry');
AutoForm.hooks({
  webInquiry: {
    onSuccess: function(formType, result) {
      var WebInquiryDate = webInquiry.findOne({"_id": result});
      if (WebInquiryDate){
        var webInquirySN = result;
        var mobilephone = WebInquiryDate.mobilephone;
        var randomStr = WebInquiryDate.randomStr;
        
        Meteor.call('callback', webInquirySN, mobilephone, randomStr, function(err, result){
          if (!err&&result){
            alert('正在拨通您的手机，请保持通话畅通！')
          }
        })
      }
    }
  }
});