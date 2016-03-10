Router.route('/shopcart', {
	'name': 'shopcart',
	onBeforeAction: function () {
		if (!Meteor.userId()) {
			Router.go('/login');
		} else {
			this.next();
		}
	},
	subscriptions: function () {
		if(Meteor.userId()) {
			Meteor.subscribe('getShopCart', Meteor.userId());
			return Meteor.subscribe('getUserAddress', Meteor.userId());
		}
	},
	data: function() {
		if(Meteor.userId()) {
			var userAddresses = UserAddress.find({userId: Meteor.userId()});
			var shopcarts = ShopCart.find({
				userId: Meteor.userId(),
				payed: false
			}, {
				sort: {
					createTime: -1
				}
			});

			var shopcarts_temp = shopcarts.map(function(shopcart) {
				if(shopcart.hasOwnProperty("servicesNameList")) {
					var servicesNameList = shopcart.servicesNameList;
					var length = servicesNameList.length;
					var servicedetail = "";
					for(var i = 0; i < length; i++) {
						servicedetail += servicesNameList[i].name;
					}
					shopcart.servicedetail = servicedetail;
				}
			
				return shopcart;
			})
			
			return {
				userAddresses: userAddresses,
				addressCount: userAddresses.count(),
				shopcarts: shopcarts_temp
			}
		}
	}	
})