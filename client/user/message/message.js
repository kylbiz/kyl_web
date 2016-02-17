Template.usercenter.rendered = function () {
    $(".tabular .item").click(function(){
    var index=$(this).index();
    $(this).addClass("active").siblings().removeClass("active");
        
$(".tab-content").find(".tab-pane").eq(index).addClass("active").siblings().removeClass("active");

    });
};

Template.UserProfile.rendered = function () {
    $(".tabular .item").click(function(){
    var index=$(this).index();
    $(this).addClass("active").siblings().removeClass("active");
        
$(".tab-content").find(".tab-pane").eq(index).addClass("active").siblings().removeClass("active");

    });
};

Template.messageUnread.events({
  'click .message-unread': function(event, template) {
    var message = event.currentTarget;
    var messageId = message.id;
    Meteor.call('HandleMessageStatus', messageId);
  }
})



Template.messages.events({
  'click .message-module': function(event, template) {
    var message = event.currentTarget;
    var messageId = message.id;
    Router.go('/user/message/detail?mid=' + messageId);
  }
})

Template.messageDetail.events({
  'click #deleteMessage': function(event, template) {
    var messageId = $("#messageId").html()||"";
    if(messageId) {
      Meteor.call('deleteMessage', messageId);
    } 
  }
})

Template.messageDetail.events({
  'click #messageBack': function(event, template) {
    Router.go('/user/message');
  }
})




