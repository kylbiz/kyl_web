//----------------------------------------------------------------------
log = console.log.bind(console, "KYLWEBDebug(" + moment().format('YYYY-MM-DD HH:mm:ss') + "): ");


//----------------------------------------------------------------------
//验证手机号码
verifyPhone = function(phone) {
  var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (!phoneReg.test(phone)) {
    return false;
  } else {
    return true;
  }
}
//----------------------------------------------------------------------
//发送手机验证码
SendVerifyCode = function() {
    var phone = $(".RegisterUserId").val() || "";
    if (verifyPhone(phone)) {
      Meteor.call('genereateUserCode', phone, function(err, codeValue) {
        if (!err && codeValue && codeValue['codestatus'] && codeValue['message']) {
          if (codeValue['codestatus'] === 0 || codeValue['codestatus'] === 2) {
            $("[id=registerError]").html(codeValue['message'] || "未知错误");
            $("[id=registerError]").show();
          }
        } else {
          $("[id=errregisterErroror]").html(codeValue['message'] || "未知错误");
          $("[id=registerError]").show();
        }
      });
    } else {
      $("[id=registerError]").html("手机号错误,请确认!");
      $("[id=registerError]").show();
    }
  }
  //----------------------------------------------------------------------
  //用户注册操作
UserRegister = function() {
    var phone = $(".RegisterUserId").val() || "";
    var password = $(".passwordregister").val() || "";
    var password_re = $(".passwordregister_re").val() || "";
    var code = $(".verifycode").val() || "";
    var checked = $(".serviceItem").prop("checked");
    if (verifyPhone(phone)) {
      if (password && password_re && password === password_re && password.length >= 6) {
        if (verifyPhone(phone) && password && code && checked) {
          var options = {
            phone: phone,
            password: password,
            code: code
          }
          Meteor.call('UserRegistration', options, function(err, registitionValue) {
            if (!err && registitionValue && (registitionValue['code'] === 0)) {
              Meteor.call('sendRegistrationInfos', phone);
              Meteor.loginWithPassword(phone, password, function(err) {
                if (err) {
                  alert("注册成功，但登录失败，请重新登录！");
                  $("#userLogin").modal("show");
                } else {
                  Cookies.set("username", phone);
                  $("#userRegister").modal("hide");
                }
              })
            } else {
              $("[id=registerError]").html(registitionValue['message'] || "unknown error");
              $("[id=registerError]").show();
            }
          })
        } else {
          $("[id=registerError]").html("信息输入不完整,请确认!");
          $("[id=registerError]").show();
        }
      } else {
        if (!password || !password_re) {
          $("[id=registerError]").html("请确认密码正确输入!");
          $("[id=registerError]").show();
        } else if (password !== password_re) {
          $("[id=registerError]").html("两次输入密码不一致,请确认!");
          $("[id=registerError]").show();
        } else if (password.length < 6) {
          $("[id=registerError]").html("密码长度少于6位,请确认!");
          $("[id=registerError]").show();
        }
      }
    } else {
      $("[id=error]").html("手机号错误,请确认!");
      $("[id=error]").show();
    }
  }
  //----------------------------------------------------------------------
  //用户登录
UserLogin = function() {
  var phone = $(".userId").val();
  var password = $(".userPassword").val();
  if (verifyPhone(phone) && password && password.length >= 6) {
    Meteor.loginWithPassword(phone, password, function(err) {
      if (err) {
        $("[id=loginError]").html("登录失败,请再次登录!");
        $("[id=loginError]").show();
        return false;
      } else {
        Cookies.set("username", phone)
      }
    })
  } else {
    $("[id=loginError]").html("输入信息有误,确认后再登录!");
    $("[id=loginError]").show();
    return false;
  }
}

//----------------------------------------------------------------------

//用户登录注册操作
UserHandle = function() {

  console.log(8888888888)

  $("#userLogin").modal({
    onHide: function() {
      $('input').val("");
    },
    onShow: function() {
      // 跳转到登录页面
      $(".registerAction").click(function() {
        $("#userRegister").modal({
          onHide: function() {
            $('input').val("");
          },
          onShow: function() {
            //点击登录按钮，天转到登录页面
            $('.registerLogin').click(function() {
              $("#userLogin").modal("show");
            });
            // 输入状态提示框消失
            $("input").focus(function() {
              $("#registerError").hide();

            });
            // 发送验证码
            $("#verifycode").click(function() {
              SendVerifyCode();
            });

            //注册操作
            $("#register").click(function() {
              UserRegister();
            });
          }
        }).modal("show")
      });
      // 输入状态提示框消失
      $("input").focus(function() {
        $("#loginError").hide();
      });
    },
    //登录操作
    onApprove: function() {
      return UserLogin();
    }
  }).modal("show")
}


