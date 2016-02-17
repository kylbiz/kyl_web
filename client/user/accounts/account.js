  function verifyPhone(phone) {
  var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
  if(!phoneReg.test(phone)) {
    return false;
  } else {
    return true;
  }
}


Template.register.events({
  'click #register': function(event, template) {
    var phone = $("[id=tel]").val().trim() || "";
    var password = $("[id=password").val().trim() || "";
    var password_re = $("[id=password_re").val().trim() || "";
    var code = $("[id=code").val() || "";
    var checked = $("[id=checked]").prop("checked") ;
		if(verifyPhone(phone)) {
			if(password && password_re && password === password_re && password.length >= 6) {
				if(verifyPhone(phone) && password && code && checked) {
					var options = {
						phone: phone,
						password: password,
						code: code
					}
					Meteor.call('UserRegistration', options, function(err, registitionValue) {
						if(!err && registitionValue && (registitionValue['code'] === 0 )) {
							Meteor.call('sendRegistrationInfos', phone);
							Meteor.loginWithPassword(phone, password, function(err) {
								if(err) {
									alert('用户注册成功,请登录系统!')               
									Router.go('/login');
								} else {
                  Cookies.set("username", phone);
										var redirect = Session.get('loginRedirect') || "/";
									Router.go(redirect);
								}
							})
						} else {
							$("[id=error]").html(registitionValue['message'] || "unknown error");           
							$("[id=error]").show();
						} 
					})
				} else {
				$("[id=error]").html("信息输入不完整,请确认!");           
				$("[id=error]").show();     
				}
			} else {
				if(!password || !password_re) {
					$("[id=error]").html("请确认密码正确输入!");           
					$("[id=error]").show();					
				} else if(password !== password_re) {
					$("[id=error]").html("两次输入密码不一致,请确认!");           
					$("[id=error]").show();				
				} else if(password.length < 6) {
					$("[id=error]").html("密码长度少于6位,请确认!");           
					$("[id=error]").show();						
				}
			}		
		} else {
			$("[id=error]").html("手机号错误,请确认!");           
			$("[id=error]").show();		
		} 
  },

  'click #btn_code': function(event, template) {
   $("[id=error]").hide();
    var phone = $("[id=tel]").val() || "";
		if(verifyPhone(phone)) {
			Meteor.call('genereateUserCode', phone, function(err, codeValue) {
				if(!err && codeValue && codeValue['codestatus'] && codeValue['message']) {
					if(codeValue['codestatus'] === 0 || codeValue['codestatus'] === 2) {
						$("[id=error]").html(codeValue['message'] || "未知错误");           
						$("[id=error]").show();                  
					}
				} else {
					$("[id=error]").html(codeValue['message'] || "未知错误");           
					$("[id=error]").show();        
				}
			});		
		} else {
			$("[id=error]").html("手机号错误,请确认!");           
			$("[id=error]").show();  		
		
		}
  },
  "focus input": function(event, template) {
    $("[id=error]").hide();
  }

})


//---------------------------------------------

Template.login.events({
  'click #login': function(event, template) {
    var phone = $("[id=tel]").val() || "";
    var password = $("[id=password]").val() || "";
		if(verifyPhone(phone)) {
			if(typeof(password) ==='string' && password.length >= 6) {
				Meteor.loginWithPassword(phone, password, function(err) {
					if(err) {
						$("[id=error]").html("登录失败,请再次登录!");           
						$("[id=error]").show();                      
					} else {
						var redirect = Session.get('loginRedirect') || "/";
						Router.go(redirect);
					}
				})		
			} else {
				$("[id=error]").html("用户名或密码错误,请确认!");           
				$("[id=error]").show(); 				
			}		
		} else {
			$("[id=error]").html("手机号错误,请确认!");           
			$("[id=error]").show();  		
		}
  }
})

Template.header.events({
  'click #logout': function() {
    Meteor.logout(function(err){
      if(err) {
        //nothing
      } else {
        Cookies.remove("username");
        Router.go('/')
      }
    });
  }
})



Template.forgetPwd.events({
  'click #btn_code': function(event, template) {
   $("[id=error]").hide();
    var phone = $("[id=tel]").val() || "";
    if(verifyPhone(phone)) {
      Meteor.call('passwordGenerateCode', phone, function(err, result) {
        if(!err && result && result.codestatus === 1) {
          $("#codeSuccess").html("验证码发送成功，请注意查收！");
          $("#codeSuccess").show();
        } else {
          $("#codeError").html("验证码发送失败");
          $("#codeError").show();
        }
      })
 
    } else {
      $("[id=phoneError]").html("手机号错误,请确认!");           
      $("[id=phoneError]").show();     
    
    }
  },  
})


function checkPassword(password1, password2) {
  if(password1 && password2 && typeof(password1) === 'string' && typeof(password2) === 'string') {
    var message = '';
    if(password1.length >=6 && password2.length >=2) {
      if(password1 === password2) {
        return true;
      } else {
        message =  '两次输入密码不一致!';
        $("[id=passwordError]").html(message);           
        $("[id=passwordError]").show();             
        return false;
      }
    } else {
      message = '至少输入6为字符的密码!';
      $("[id=passwordError]").html(message);           
      $("[id=passwordError]").show();           
      return false;
    }
  } else {
    message = '密码必须为字符!';
    $("[id=passwordError]").html(message);           
    $("[id=passwordError]").show();             
    return false;
  }
}


Template.forgetPwd.events({
  "click .change": function(event) {
    var phone = $("[id=tel").val();
    var password = $("[id=password]").val() || "";
    var password_re = $("[id=password_re]").val() || "";
    var verifyCode = $("#verifyCode").val() || "";
    if(verifyPhone(phone) && verifyCode && password && checkPassword(password, password_re)) {
      var options = {
        username: phone,
        password: password,
        verifyCode: verifyCode
      }
      Meteor.call("changeUserPassword", options, function(err, result) {
        if(err) {
          $("#codeError").html("修改密码失败，请重试！");
          $("#codeError").show();
        } else if(result && result.status && result.status === 1){
          $("#codeSuccess").html("修改密码成功");
          $("#codeSuccess").show();
          Router.go('/login')
        } else {
          $("#codeError").html(result.message);
          $("#codeError").show();
        }   
      })   
    } else {
      if(!verifyPhone(phone)){
        $("#phoneError").html("手机号码有误，请确认！");
        $("phoneError").show();
      } else if(!verifyCode) {
          $("#codeSuccess").html("请输入验证码");
          $("#codeSuccess").show();        
      }
    }
  }
})


Template.forgetPwd.events({
  "focus input": function(event) {
    $("#passwordError").hide();
    $("#phoneError").hide();
    $("#codeError").hide();
    $("#codeSuccess").hide();
  } 
})























