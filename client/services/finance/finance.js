// Template.FinanceHandle.onRendered(function(){
//   var template = this;
//    template.autorun(function () {
//      Session.set("totalAmount", Session.get("benchmark") * Session.get("datetimeRange"));
//    });
// });

// Template.FinanceHandle.helpers({
//   "financeAgent": function () {
//     return FinanceLists.find().fetch();
//   },
//   "isZero":function() {
//     if (!Session.get('financeType')) {
//       var firstProduct = FinanceLists.find({}).fetch()[0];
//       Session.set("financeType",firstProduct.name || "");
//     }

//     var type = Session.get("financeType");
//     var isZero = ( type == "zero");
//     var productInfo = FinanceLists.findOne({name: type});
//     if (isZero) {
//       Session.set("benchmark", productInfo.payment || 0);
//       Session.set("datetimeRange",productInfo.period.items[0].value || 0);
//     } else {
//       var opts = productInfo.opts;
//       var benchmark = Math.min(opts.annualIncome.items[0].value, opts.certiNum.items[0].value);
//       Session.set("benchmark", benchmark || 0);
//       Session.set("datetimeRange",productInfo.period.items[0].value || 0);
//     }

//     return isZero;
//   },
//   "certificate":function(){
//     return FinanceLists.findOne({name:'common'}).opts.certiNum;
//   },
//   "income":function(){
//     return FinanceLists.findOne({name:'common'}).opts.annualIncome;
//   },
//   "period":function(){
//     var type = Session.get("financeType");
//     return FinanceLists.findOne({name: type}).period;
//   },
//   "benchmark":function(){
//     return Session.get("benchmark");
//   },
//   "totalAmount":function(){
//     return Session.get("totalAmount");
//   }
// });

// Template.FinanceHandle.events({
//   "click .selection li":function(e) {
//     var self = $(e.currentTarget);
//     $(self).addClass("active").siblings().removeClass("active");
//   },
//   "click #packpage li":function(e){
//     var self = $(e.currentTarget);
//     var financeType = $(self).data("type");
//     Session.set("financeType", financeType);
//     $("#dataTimeRange li").first().addClass("active").siblings().removeClass("active");
//   },
//   "click #income li":function(e) {
//     var self = $(e.currentTarget);
//     var thisPayment = $(self).data("payment");
//     var otherPayment = $("#certificate").find("li.active").first().data("payment");
//     Session.set("benchmark",Math.min(thisPayment,otherPayment));
//   },
//   "click #certificate li":function(e) {
//     var self = $(e.currentTarget);
//     var thisPayment = $(self).data("payment");
//     var otherPayment = $("#income").find("li.active").first().data("payment");
//     Session.set("benchmark",Math.min(thisPayment, otherPayment));
//   },
//   "click #dataTimeRange li":function(e) {
//     var self = $(e.currentTarget);
//     var datetimeRange = $(self).data("range");
//     Session.set("datetimeRange",datetimeRange);
//   }
// })

// Template.finance.events({
// 	'click #buy': function (event) {
//     if(Meteor.userId()) {
//     //类型
//       var financeService = Session.get("financeType");
//       var productInfo = FinanceLists.findOne({name: financeService});
//       var financeTypeName = productInfo.label;
//     //选择时间
//       var period = Session.get("datetimeRange");
//     //显示时间
//       var periodType = period+"个月";
//     //费用
// 			var financePayment = Session.get("totalAmount");
//     //单价
//       var benchmark = Session.get("benchmark");

// 			var productType = "财务代理";
// 			var typeNameFlag = "finance";
// 			var services = [];

// 			if (!financeService || !financeTypeName || !financePayment || !periodType) {
// 				$("[id=financeError]").html("请选择服务!");
// 				$("[id=financeError]").show();
//         return false;
// 			}

//        //零申报
//       if(financeService == 'zero') {
//         services = [
//           {
//             productType: productType,
//             typeNameFlag: typeNameFlag,
//             moneyAmount: financePayment,
//             servicesNameList: [
//             {
//               name: financeTypeName + "-" + periodType,
//               period: period,
//               money: financePayment,
//               scale: 1,
//               servicesContains: []
//             }
//             ]
//           }
//         ]
//       }
//       //普通行业
//       else if(financeService == 'common'){

//         //年收入:
//         var incomeName = $("#income li.active").text();
//         var annualIncome = $("#income li.active").data("key");
//         //凭证量：
//         var certificateName = $("#certificate li.active").text();
//         var certiNum = $("#certificate li.active").data("key");
//         var financeServiceName = "年收入" + incomeName+","+"凭证量" + certificateName;
//         services = [
//           {
//             productType: productType,
//             typeNameFlag: typeNameFlag,
//             moneyAmount: financePayment,
//             servicesNameList: [
//               {
//                 name: financeTypeName + "-" + financeServiceName + "-" + periodType,
//                 annualIncome: annualIncome,
//                 certiNum: certiNum,
//                 period: period,
//                 money: financePayment,
//                 scale: 1,
//                 servicesContains: []
//               }
//             ]
//           }
//         ]
//       }

// 				if(services.length >=1) {
// 					Meteor.call('shopcartAdd', services, function (err) {
// 						if (err) {
// 							$("[id=financeError]").html("加入购物车失败!");
// 							$("[id=financeError]").show();

// 						} else {
// 							Router.go('/shopcart')
// 						}
// 					});
// 				}

// 		} else {
// 			UserHandle();
// 		}
// 	}

// });

// Template.FinanceHandle.onRendered(function(){
//   $(".hint1 .overlook").click(function(){
//      $(".ui.modal.hint1").modal("show");
//   })
//   $(".hint2 .overlook").click(function(){
//      $(".ui.modal.hint2").modal("show");
//   })
// })
