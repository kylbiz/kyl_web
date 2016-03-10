Router.route('/spay/result', {
	name: 'payResult',
	data: function () {
		var query = this.params.query;
		if (query && query.is_success) {
			// Meteor.call('updatePayLogs', query);
			setTimeout(function() {
				Router.go('/user/orders')
			}, 400)
		} else {
			Router.go('/shopcart')
		}
	}
});

Router.route('/webhook', {
	name: 'webhook'
});



//e3196170-581f-11e5-839a-6b8d3c71da8f
// var query = {
//   "buyer_email":"1334416803@qq.com",
//   "buyer_id":"2088502326264585",
//   "exterface":"create_direct_pay_by_user",
//   "is_success":"T",
//   "notify_id":"RqPnCoPT3K9/vwbh3InVbhkIXQ5E77EC3NeOSa6ErexKltJq6q5YoebdET1puJB4Rnkh",
//   "notify_time":"2015-08-28 11:52:34",
//   "notify_type":"trade_status_sync",
//   "out_trade_no":"201508271210550170",
//   "payment_type":"1",
//   "seller_email":"kylbiz@163.com",
//   "seller_id":"2088612207933748",
//   "subject":"抄报税季度[小规模纳税人]",
//   "total_fee":"0.01",
//   "trade_no":"2015082821001004580048357805",
//   "trade_status":"TRADE_SUCCESS",
//   "sign":"adebb951d959bdb515d94f9def4810d8",
//   "sign_type":"MD5"
// }
