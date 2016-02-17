Meteor.publish('webInquiry', function(webInquirySN){
    //return webInquiry.find(webInquirySN);
    //return webInquiry.find({_id: webInquirySN})
    return webInquiry.find({});
});