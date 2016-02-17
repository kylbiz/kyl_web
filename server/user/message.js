
Meteor.methods({
  'HandleMessageStatus': function(messageId) {
    if(messageId) {
      Messages.update({_id: messageId}, {
        $set: {
          read: true
        }
      }, function(err) {
        if(err) {
          console.log('handle  message status error');
          console.log(err);
        } else {
         console.log('handle  message status succeed');         
        }
      })
    }
  },
  "deleteMessage": function(messageId) {
    if(messageId) {
      Messages.remove({_id: messageId}, function(err) {
        if(err) {
          console.log('delete message: ' + messageId + 'error');
          console.log(err);
        } else {
          console.log('delete message succeed');
        }
      })
    }
  }

})



