
Template.license.onRendered(function() {
  var licenseType = $(".licensetype li.active").attr("data-license") || "";
  Session.set("licenseType", licenseType);
  $("#licenseError").hide();

  setTimeout(function() {
    $(".licenszone li").first().addClass("active").siblings().removeClass("active");
    var payment =  $(".licenszone li").first().attr("data-payment") || 0;
    var zone = $(".licenszone li").first().attr("data-zone") || "";
    Session.set("liceseZone", zone);
    Session.set("payment", payment);
  }, 100);


  $(".ui.modal").on("click",".licensetype li",function(){
    $(this).addClass("active").siblings().removeClass("active");
    Session.set("licenseType", $(this).attr("data-license"));
    $("#licenseError").hide();
    setTimeout(function() {
      $(".licenszone li").first().addClass("active").siblings().removeClass("active");
      var payment =  $(".licenszone li").first().attr("data-payment") || 0;
      var zone = $(".licenszone li").first().attr("data-zone") || "";
      Session.set("liceseZone", zone);
      Session.set("payment", payment);
    }, 100);

  })

  $(".ui.modal").on("click",".licenszone li",function(){
    $(this).addClass("active").siblings().removeClass("active");
    var payment = $(this).attr("data-payment") || 0;
    var zone = $(this).attr("data-zone") || "";
    Session.set("liceseZone", zone);
    Session.set("payment", payment);    
    $("#licenseError").hide();
  });  
})

Template.license.helpers({
  "licenseTypeLists": function() {
    var licenseType = Session.get("licenseType") || "urban";
    return  LicenseLists.findOne({type: licenseType});
  },
  "paymentL": function() {
    return Session.get("payment") || 0;
  }
})


Template.license.events({
 "click #go":function(){
    //模态框
    $("#licenseModal").modal({
      onShow: function () {
        if(Session.set("region")) {
          $("#toggle li").eq(1).addClass("active").siblings().removeClass("active");          
        }
        else {
          $("#toggle li").eq(0).addClass("active").siblings().removeClass("active"); 
        }
      },
      onApprove: function () {
        if(!Meteor.user()) {
          UserHandle();
        } else {
          var liceseZone = Session.get("liceseZone") || "";
          var licensePayment = Session.get("payment") || 0;

          if(liceseZone.length >=2 && licensePayment) {
            var userId = Meteor.userId();
            var services = [
              {
                productType: '三证执照',
                typeNameFlag: 'license',
                moneyAmount: licensePayment,
                servicesNameList: [
                  {
                    name: '三证执照[' + liceseZone + ']',
                    money: licensePayment,
                    scale: 1,
                    zone: liceseZone,
                    servicesContains: [
                      {name: '三证执照'}
                    ]
                  }
                ]
              }
            ];

            Meteor.call('shopcartAdd', services, function (err) {
              if (err) {
                $("[id=bankError]").html("加入购物车失败!");
                $("[id=bankError]").show();

              } else {
                Router.go('/shopcart');
              }
            });  

          } else {
            $("#licenseError").html("请选择区域！");
            $("#licenseError").show();
            return false;
          }
        }

		  }
    }).modal('show');      
 }
});




//----------------------------------------------------------------------
//验证手机号码
function verifyPhone(phone) {
  var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (!phoneReg.test(phone)) {
    return false;
  } else {
    return true;
  }
}

//----------------------------------------------------------------------

//发送手机验证码
var SendVerifyCode = function () {
    var phone = $(".RegisterUserId").val() || "";
    if (verifyPhone(phone)) {
      Meteor.call('genereateUserCode', phone, function (err, codeValue) {
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
var UserRegister = function () {
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
        Meteor.call('UserRegistration', options, function (err, registitionValue) {
          if (!err && registitionValue && (registitionValue['code'] === 0)) {
            Meteor.call('sendRegistrationInfos', phone);
            Meteor.loginWithPassword(phone, password, function (err) {
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
var UserLogin = function () {
  var phone = $(".userId").val();
  var password = $(".userPassword").val();

  if (verifyPhone(phone) && password && password.length >= 6) {
    Meteor.loginWithPassword(phone, password, function (err) {
      if (err) {
        $("[id=loginError]").html("登录失败,请再次登录!");
        $("[id=loginError]").show();
        return false;
      } else {
        Cookies.set("username", phone);
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
var UserHandle = function () {
  $("#userLogin").modal({
    onHide: function () {
      $('input').val("");
    },
    onShow: function () {
      // 跳转到登录页面
      $(".registerAction").click(function () {
        $("#userRegister").modal({
          onHide: function () {
            $('input').val("");
          },
          onShow: function () {
            //点击登录按钮，天转到登录页面
            $('.registerLogin').click(function () {
              $("#userLogin").modal("show");
            });
            // 输入状态提示框消失
            $("input").focus(function () {
              $("#registerError").hide();

            });
            // 发送验证码
            $("#verifycode").click(function () {
              SendVerifyCode();
            });

            //注册操作
            $("#register").click(function () {
              UserRegister();
            });
          }
        }).modal("show")
      });
      // 输入状态提示框消失
      $("input").focus(function () {
        $("#loginError").hide();
      });
    },
    //登录操作
    onApprove: function () {
      return UserLogin();
    }
  }).modal("show")
}


//----------------------------------------------------------------------












