$(document).ready(function() {
  var username = Cookies.get("username");
  if (username) {
    $("header .username").text(username);
    $(".usercenterL").show();
    $(".accountL").hide();
  } else {
    $(".accountL").show();
    $(".usercenterL").hide();
  }

});