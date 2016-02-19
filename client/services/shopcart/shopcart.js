Template.shopcart.rendered = function () {
	var all = true;
	$(".headTable").find("input").first().click(function () {
		var status = !all;
		$("input[type='checkbox']").prop("checked", status);
		all = !all;
		var num = 0;
		var MoneyAmount = 0;
		$('.shopitem').each(function (index, element) {
			if ($(element).prop("checked") === true) {
				var money = parseInt($(element).attr('data-money')) || 0;
				MoneyAmount += money;
				num++;
			}
		});
		Session.set('shopcartNum', num);
		Session.set('MoneyAmount', MoneyAmount);
	});
};

Template.shopcart.onRendered(function() {
	setTimeout(function () {
		var num = 0;
		var MoneyAmount = 0;
		$('.shopitem').each(function (index, element) {
			if ($(element).prop("checked") === true) {
				var money = parseInt($(element).attr('data-money')) || 0;
				MoneyAmount += money;
				num++;
			}
		});
		Session.set('shopcartNum', num);
		Session.set('MoneyAmount', MoneyAmount);
	}, 200)
})





//----------------------------------------------------------------


Template.shopcart.helpers({
	shopcartNum: function () {
		return Session.get('shopcartNum');
	},
	MoneyAmount: function() {
		return Session.get('MoneyAmount');
	}
});

Template.shopcart.events({
	"click .checkAll": function(event) {
		var checked = $(event.currentTarget).prop("checked") || false;
		$('.shopitem').prop('checked', checked);
		setTimeout(function () {
			var num = 0;
			var MoneyAmount = 0;
			$('.shopitem').each(function (index, element) {
				if ($(element).prop("checked") === true) {
					var money = parseInt($(element).attr('data-money')) || 0;
					MoneyAmount += money;
					num++;
				}
			});
			Session.set('shopcartNum', num);
			Session.set('MoneyAmount', MoneyAmount);
		}, 200)
	}
})







//----------------------------------------------------------------
Template.shopcart.events({
	"click .shopitem": function (event) {
		var num = 0;
		var MoneyAmount = 0;
		$('.shopitem').each(function (index, element) {
			if ($(element).prop("checked") === true) {
				var money = parseInt($(element).attr('data-money')) || 0;
				MoneyAmount += money;
				num++;
			}
		});
		if(num < $('.shopitem').length ) {
			$(".headTable").find("input").first().prop('checked', false);
		}
		Session.set('shopcartNum', num);
		Session.set('MoneyAmount', MoneyAmount);
	}
})

//----------------------------------------------------------------

Template.shopcart.events({
	"click .delete": function (event) {
		var relationId = $(event.currentTarget).attr('data-relationid') || "";

		if (Meteor.userId()) {
			Meteor.call('DeleteShopCartItem', relationId, function(err) {
			var num = 0;
			var MoneyAmount = 0;
			$('.shopitem').each(function (index, element) {
				if ($(element).prop("checked") === true) {
					var money = parseInt($(element).attr('data-money')) || 0;
					MoneyAmount += money;
					num++;
				}
			});
			Session.set('shopcartNum', num);
			Session.set('MoneyAmount', MoneyAmount);
			});

		} else {
			//handle something
		}
	}
});

//----------------------------------------------------------------
Template.shopcart.events({
	"click .billing": function (event, template) {
		var addressId = "";
		$('.addressradio').each(function(index, element) {
			if($(element).prop('checked') === true) {
				addressId = $(element).attr('data-addressid');
			}	
		})
		
		if(addressId) {
			var shoplists = [];
			var couponId = $('.coupon').val() || "";
			var invoice = $('.invoice').prop("checked")||false;
			
			$('.shopitem').each(function (index, element) {
				if ($(element).prop("checked") === true) {
					var relationId = $(element).attr('data-relationid');
					var money = $(element).attr('data-money');
					var servicename = $(element).attr('data-servicename');
					var servicedetail = $(element).attr("data-servicedetail") || servicename;
					var list = {
						relationId: relationId,
						money: money,
						servicename: servicename,
						servicedetail: servicedetail
					}
					shoplists.push(list);
				}
			})

			if (shoplists.length > 0) {
				var shoplistOptions = {
					addressId: addressId,
					couponId: couponId,
					invoice: invoice,
					shoplists: shoplists
				}	
				
				
				Meteor.call('ShopListsPayOptions', shoplistOptions, function (err, options) {
					if (err) {
						console.log("generate pay logs error");

					} else {
						BC.err = function (err) {
							console.log(err)
						};

						BC.click(options);
					}

				});

			} else {
				// 空订单，不允许支付

			}
		} else {
			$('#addressErrorTip').html('请添加联系人信息后再提交!');
			$("#addressErrorTip").show();
		}
	}
})

//----------------------------------------------------------------