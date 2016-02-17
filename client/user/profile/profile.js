
function checkEmail(str){
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(re.test(str)){
      return true;
    }else{
      return false;
    }
}


Template.UserBasic.events({
  'submit form': function(event, template) {
    var nickname = $("[id=nickname]").val() || "";
    var email = $("[id=email]").val() || "";
    var phone = $("[id=phone]").val() || ""
    if(nickname.length >= 3 || checkEmail(email)) {
      var profileOptions = {
        nickname: nickname,
        email: email,
        phone: phone
      }
      Meteor.call('updateProfile', profileOptions);
    }
    return false; 
  }

})

Template.ModifyPassword.events({
  'submit form': function(event, template) {
    var password = $("[id=password]").val() || " ";
    var password1 = $("[id=password1]").val() || " ";
    var password2 = $("[id=password2]").val() || " ";

    function checkPassword(password1, password2) {
      if(password1 && password2 && typeof(password1) === 'string' && typeof(password2) === 'string') {
        var message = '';
        if(password1.length >=6 && password2.length >=2) {
          if(password1 === password2) {
            return true;
          } else {
            message =  '两次输入密码不一致!';
            $("[id=error]").html(message);           
            $("[id=error]").show();             
            return false;
          }
        } else {
          message = '至少输入6为字符的密码!';
          $("[id=error]").html(message);           
          $("[id=error]").show();           
          return false;
        }
      } else {
        message = '密码必须为字符!';
        $("[id=error]").html(message);           
        $("[id=error]").show();             
        return false;
      }
    }
    if(password && checkPassword(password1, password2)) {
      Accounts.changePassword(password, password2, function(err) {
        if(err) {
          var message = '修改密码失败!';
          $("[id=error]").html(message);           
          $("[id=error]").show();            
        } else {
          // modified password succeed
          Meteor.logout(function(err) {
            if(err) {
              var message = '修改密码成功,退出后请重新登录!';
              $("[id=success]").html(message);           
              $("[id=success]").show();  
            } else {              
              Router.go('/login');
              alert('修改密码成功,请重新登录!');
            }
          })

        }
      })
    } 
    return false;
  },
  "focus input": function(event, template) {
    $("[id=error]").hide();
  }
  
})







