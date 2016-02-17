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
			return {
				userAddresses: userAddresses,
				addressCount: userAddresses.count(),
				shopcarts: shopcarts
			}
		}
	}	
})