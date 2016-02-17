var Fiber = Npm.require('fibers');
var Future = Npm.require('fibers/future');
var crypto = Npm.require('crypto');

Meteor.methods({
	randomStr: function () {//产生随机字符串
		return crypto.randomBytes(16).toString('hex');
	},

	callback: function (webInquirySN, mobile, randomStr) {
		console.log(webInquirySN);
		var fut = new Future();
		var self = this;

		if (!checkMobile(webInquirySN, randomStr)){
			return "callback check failed!"
		}else{
			Fiber(function () {
				HTTP.call("GET", "http://q.kyl.biz/omed/CallBack.php?str=kylbizadmin123&mobile="+mobile,
					function (err, result) {
						if (!err) {
							console.log(JSON.parse(result.content));
							var CallBackResult = JSON.parse(result.content);

							if (CallBackResult.statusCode==='000000'){
								fut['return'](true);

								webCallback.insert({
									webInquirySN: webInquirySN,
									mobile: mobile,
									randomStr: randomStr,
									statusCode: CallBackResult.statusCode,
									callSid: CallBackResult.callSid,
									dateCreated: CallBackResult.dateCreated,
									createTime: new Date(),
									ip: self.connection.clientAddress
								});

								webInquiry.update({
									_id: webInquirySN
								},{
									$set: {
										isCalled: true
									}
								});
							}else{
								fut['return'](false);
							}
						}
				})
			}).run();
		}

		return fut.wait();
	}
})

function checkMobile(webInquirySN, randomStr){//check random strings
	if (webInquirySN) {
		var return_str = webInquiry.findOne(webInquirySN).randomStr;
		if (return_str === randomStr)
			return true;
		else
			return false;
	}
}
