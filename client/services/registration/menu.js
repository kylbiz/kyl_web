Template.RegistrationTypeList.onRendered(function() {
  Session.set("others", false);
  setTimeout(function() {
    var productTypeName = Session.get("productTypeName");
    if(productTypeName === "qita") {
      Session.set("others", true);
    }
  }, 100)
});


Template.registration.helpers({
  "otherHandle": function() {
    return Session.get("others");
  }
})

Template.RegistrationHandle.helpers({
  "imgURI": function() {
    var productTypeName = Session.get("productTypeName");

    var imgURI = 'registration';
    switch (productTypeName) {
      case 'year2016':
        imgURI += '14.jpg';
        break;
      case 'touzi':
        imgURI += '15.png';
        break;
      case 'jisu':
        imgURI += '04.jpg';
        break;
      case 'dianshang':
        imgURI += '05.jpg';
        break;
      case 'jiaoyu':
        imgURI += '06.jpg';
        break;
      case 'jinrong':
        imgURI += '07.jpg';
        break;
      case 'yidong':
        imgURI += '08.jpg';
        break;
      case 'wenhua':
        imgURI += '09.jpg';
        break;
      case 'shangwu':
        imgURI += '10.jpg';
        break;
      case 'jianzhu':
        imgURI += '11.jpg';
        break;
      case 'yiliao':
        imgURI += '12.jpg';
        break;
      case 'qita':
        imgURI += '13.jpg';
        break;
      default:
        imgURI += '04.jpg';
        break;
    }
    return imgURI;
  }
})

//----------------------------------------------------------------------

Template.serviceList.rendered = function() {
  $(".oMenu .grid .column").click(function() {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    if (index == 0)
      $(".oMenu .tab-pane").addClass("active");
    else
      $(".oMenu .tab-pane").removeClass("active");
    window.location.href = $(this).find('a').attr("href");
  });
};

//----------------------------------------------------------------------
Template.RegistrationTypeList.onRendered(function() {
  setTimeout(function() {
    $('.zoneSelect li').first().addClass('active').siblings().removeClass('active');
    Session.set('zone', $('.zoneSelect li').first().html());
    Session.set('payment', $('.zoneSelect li').first().attr('data-payment'));
    Session.set("message", $('.zoneSelect li').first().attr('data-message'));
  }, 400)
});

//----------------------------------------------------------------------

Template.RegistrationTypeList.events({
  'click .productTypeName li.typeName': function(event, template) {
    Session.set("others", false);
    var rgistrationType = event.currentTarget;
    $(rgistrationType).addClass("active").siblings().removeClass("active")
    setTimeout(function() {
      $('.zoneSelect li').first().addClass('active').siblings().removeClass('active');
      Session.set('zone', $('.zoneSelect li').first().html());
      Session.set('payment', $('.zoneSelect li').first().attr("data-payment"));
      Session.set('message', $('.zoneSelect li').first().attr("data-message"));
    }, 100)
  }
});

Template.RegistrationTypeList.events({
  "click .productTypeName li.others": function(event) {
    Session.set("others", true);
    $(event.currentTarget).addClass("active").siblings().removeClass("active");
  }
})

//----------------------------------------------------------------------

Template.RegistrationHandle.events({
  'click .zoneSelect li': function(event, template) {
    var zoneHtml = event.currentTarget;
    $(zoneHtml).addClass("active").siblings().removeClass("active");
    setTimeout(function() {
      var zone = $(zoneHtml).html();
      Session.set('zone', zone);
      Session.set("payment", $(zoneHtml).attr("data-payment"));
      Session.set("message", $(zoneHtml).attr("data-message"));
      $("[id=zoneError]").hide();
    }, 100)
  }

});
//----------------------------------------------------------------------

Template.RegistrationHandle.helpers({
  "paymentL": function() {
    return Session.get("payment");
  },
  "messageL": function() {
    return Session.get("message");
  }
});

Template.RegistrationTypeList.helpers({
  productTypeName: function() {
    return Session.get("productTypeName");
  }
})

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
var SendVerifyCode = function() {
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
var UserRegister = function() {
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
var UserLogin = function() {
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
var UserHandle = function() {
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


//----------------------------------------------------------------------

Template.RegistrationHandle.events({
  //添加购物车
  "click #buy": function(event, template) {
    if (Meteor.userId()) {
      var zone = $('.zoneSelect li.active').html();
      var cnProductTypeName = $(".typeName.active").find("a").html() || "公司注册";
      if (zone && cnProductTypeName) {
        var services = [];
        var productType = '公司注册';
        var productTypeName = cnProductTypeName;
        var moneyAmount = $("#moneyAmount").html();
        var baseService = $("#baseService").html();
        if (zone && baseService && productTypeName && moneyAmount) {
          services = [{
            productType: productType,
            typeNameFlag: 'registration',
            moneyAmount: moneyAmount,
            servicesNameList: [{
              name: productTypeName + '[' + zone + ']',
              money: moneyAmount,
              scale: 1,
              zone: zone,
              servicesContains: [{
                name: baseService
              }]
            }]
          }];

          Meteor.call('shopcartAdd', services, function(err) {
            if (err) {
              $("[id=orderError]").html("加入购物车失败!");
              $("[id=orderError]").show();

            } else {
              Router.go('/shopcart')
            }
          });
        }

      } else {
        $("[id=orderError]").html("请选择注册区域");
        $("[id=orderError]").show();
      }
    } else {
      UserHandle();
    }
  }
})

//----------------------------------------------------------------------