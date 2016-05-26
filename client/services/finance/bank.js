// Template.BankMenu.rendered = function () {
// 	$("#financeTag").addClass('active').siblings().removeClass("active");
// }
// Template.BankMenu.onRendered(function(){
//   $(".overlook").click(function(){
//     $('.ui.modal.photo')
//     .modal('show')
//   });
// });
// //----------------------------------------------------------------------

// Template.BankHandle.helpers({
// 	banks: function () {
// 		return BankLists.find().fetch();
// 	},
// 	pay: function () {
// 		if (!Session.get('payment')) {
// 			Session.set('payment', BankLists.find().fetch()[0].payment);
// 		}
// 		return Session.get('payment');
// 	}
// });

// Template.BankHandle.events({
// 	"click .banklist li": function (event, template) {
// 		$(event.currentTarget).addClass('active').siblings().removeClass("active");
// 		Session.set('payment', $(event.currentTarget).data('payment') || 0);
// 	}
// })

// //----------------------------------------------------------------------

// Template.bank.events({
// 	"click #buy": function (event, template) {
// 		if (Meteor.userId()) {
// 			var bankName = $(".banklist li.active").first().html();
// 			var payment = $("#payment").html();
// 			var baseService = $("#baseService").html() || "";
// 			var services = [];
// 			if (bankName && payment) {
// 				services = [
// 					{
// 						productType: "银行开户",
// 						typeNameFlag: 'bank',
// 						moneyAmount: payment,
// 						servicesNameList: [
// 							{
// 								name: bankName,
// 								money: payment,
// 								scale: 1,
// 								servicesContains: [
// 									{name: baseService}
// 								]
// 							}
// 						],
// 					}
// 				];
// 				Meteor.call('shopcartAdd', services, function (err) {
// 					if (err) {
// 						$("[id=bankError]").html("加入购物车失败!");
// 						$("[id=bankError]").show();

// 					} else {
// 						Router.go('/shopcart');
// 					}
// 				});

// 			} else {
// 				$("[id=bankError]").html("请选择开户银行!");
// 				$("[id=bankError]").show();
// 			}
// 		} else {
// 			UserHandle();
// 		}
// 	}
// })


// //----------------------------------------------------------------------

// Template.RegistrationHandle.events({
// 	//添加购物车
// 	"click .AddShopcart": function (event, template) {
// 		if (Meteor.userId()) {
// 			var zone = $('.zoneSelect li.active').html();
// 			if (zone) {
// 				var services = [];
// 				var productTypeName = Session.get('productTypeName');
// 				var moneyAmount = $("#moneyAmount").html();
// 				var baseService = $("#baseService").html();
// 				if (zone && baseService && productTypeName && moneyAmount) {
// 					services = [
// 						{
// 							productType: productTypeName,
// 							moneyAmount: moneyAmount,
// 							isRegistration: true,
// 							zone: zone,
// 							isMainProduct: true,
// 							servicesNameList: [{
// 								name: baseService
// 							}]
// 						},
// 						{
// 							productType: baseService,
// 							moneyAmount: 0,
// 							isMainProduct: false,
// 							isRegistration: true,
// 							zone: zone
// 						}
// 					];

// 					Meteor.call('shopcartAdd', services, function (err) {
// 						if (err) {
// 							$("[id=orderError]").html("加入购物车失败!");
// 							$("[id=orderError]").show();

// 						} else {
// 							Router.go('/shopcart')
// 						}
// 					});
// 				}

// 			} else {
// 				$("[id=orderError]").html("请选择注册区域");
// 				$("[id=orderError]").show();
// 			}
// 		} else {
// 			UserHandle();
// 		}
// 	}
// })

// //----------------------------------------------------------------------
