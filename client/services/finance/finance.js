
Template.FinanceMenu.rendered = function() {
  $("#financeTag").addClass('active').siblings().removeClass("active");
}


Template.FinanceHandle.rendered = function () {

	var financeType = $('.financeType li.active').attr('data-finance');
  var financeService = $('.financeService li.active').attr('data-service');
	Session.set('financeType', financeType);
  Session.set('financeService', financeService);
	setTimeout(function () {
		$('.financePeriod li').first().addClass('active').siblings().removeClass("active");
    var financePayment = $('.financePeriod li').first().attr('data-payment');
    Session.set('financePayment', financePayment);
	}, 100)
}


Template.FinanceTypeList.events({
	"click li.typeName": function (event, template) {
		$(event.currentTarget).addClass('active').siblings().removeClass("active");
    var url = $(event.currentTarget).find('a').attr('href');
    Router.go(url);
	}
})



Template.finance.events({
	'click .financeType li': function (event) {
		var financeTypeHtml = event.currentTarget;
		$(financeTypeHtml).addClass("active").siblings().removeClass("active");
		var financeType = $(financeTypeHtml).attr('data-finance');
		Session.set('financeType', financeType);

		setTimeout(function () {
			$('.financePeriod li').first().addClass('active').siblings().removeClass("active");
      var periodType = $('.financePeriod li').first().html();
      Session.set('periodType', periodType);
      var financePayment = $('.financePeriod li').first().attr('data-payment');
      Session.set('financePayment', financePayment);      
		}, 100);
	},

	'click .financeService li': function (event, template) {
		var financeServiceHtml = event.currentTarget;
		$(financeServiceHtml).addClass("active").siblings().removeClass("active");
    var financeService = $(financeServiceHtml).attr('data-service');
    Session.set('financeService', financeService);

    if(financeService !==3) {
	    setTimeout(function () {
	      $('.financePeriod li').first().addClass('active').siblings().removeClass("active");
	      var periodType = $('.financePeriod li').first().html();
	      Session.set('periodType', periodType);
	      var financePayment = $('.financePeriod li').first().attr('data-payment');
	      Session.set('financePayment', financePayment);      
	    }, 100);
    } else {
    	
    }
    
	},

  'click .financePeriod li': function(event, template) {
    $(event.currentTarget).addClass('active').siblings().removeClass("active");
    var periodType = $(event.currentTarget).html();
    Session.set('periodType', periodType);
    var financePayment = $(event.currentTarget).attr('data-payment');
    Session.set('financePayment', financePayment);  
  }

});

//----------------------------------------------------------------------
Template.finance.events({
	'click #buy': function (event) {
		if(Meteor.userId()) {
			var financeTypeName = $('.financeType li.active').html();
			var financeService = $('.financeService li.active').attr("data-service");
			var financeServiceName = $('.financeService li.active').html();
      var periodType = $('.financePeriod li.active').html();
			var financePayment = $('#financePayment').html();
			var productType = "财务代理";
			var typeNameFlag = "finance";
			var services = [];
			if (!financeService || !financeTypeName || !financePayment || !periodType) {
				$("[id=financeError]").html("请选择服务!");
				$("[id=financeError]").show();
			} else {
				if(financeService === 3) {
					services = [
						{
							productType: productType,
							typeNameFlag: typeNameFlag,
							moneyAmount: financePayment,
							servicesNameList: [
							{
								name: financeTypeName + "-" + financeServiceName,
								money: financePayment,
								scale: 1,
								servicesContains: []								
							}
							]							
						}
					]
				} else {
					services = [
						{
							productType: productType,
							typeNameFlag: typeNameFlag,
							moneyAmount: financePayment,
							servicesNameList: [
								{
									name: financeTypeName + "-" + financeServiceName + "-" + periodType,
									money: financePayment,
									scale: 1,
									servicesContains: []
								}
							]
						}
					]
				}

				if(services.length >=1) {
					Meteor.call('shopcartAdd', services, function (err) {
						if (err) {
							$("[id=financeError]").html("加入购物车失败!");
							$("[id=financeError]").show();

						} else {
							Router.go('/shopcart')
						}
					});
				}
			}	
		} else {
			UserHandle();
		}
	}

})

//----------------------------------------------------------------------
Template.FinanceHandle.helpers({
	financePayment: function () {
		return Session.get('financePayment');
	},
	financeList: function() {
		var financeType = Session.get("financeType") || "small";
		var financeService = Session.get("financeService") || 1;
		return FinanceLists.findOne({
			financeType: financeType,
			serviceType: financeService
		})
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

Template.FinanceHandle.onRendered(function(){
  $(".hint1 .overlook").click(function(){
     $(".ui.modal.hint1").modal("show");
  })
  $(".hint2 .overlook").click(function(){
     $(".ui.modal.hint2").modal("show");
  })  
})
//----------------------------------------------------------------------
