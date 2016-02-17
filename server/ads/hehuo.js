function log(info) {
  console.log('-------------------------------------')
  var len = arguments.length;
  for(var i =0; i < len; i++) {
    console.log(arguments[i]);
  }
}

//----------------------------------------

function randomNumber(number) {
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var str = "";
  for(var i = 0; i < number; i++) {
    pos = Math.round(Math.random() * (arr.length -1));
    str += arr[pos];
  }
  return str;
}

//----------------------------------------

Meteor.methods({
	"AddAdsShopcart": function(options) {
		if(!options || !options.hasOwnProperty("userId") || !options.userId === Meteor.userId() || !options.hasOwnProperty("type")) {
			log("AddHhShopcart: options illegal", options);
		} else {
			var type = options.type || "";
			var ads = AdsLists.findOne({typeNameFlag: type});

			var payment = 0;

			if(!ads || !ads.hasOwnProperty("payment")) {
				log("AddHhShopcart: ads does not has payment, failed");
			} else {
				payment = ads.payment || 0;
				var relationId = moment(new Date()).format("YYYYMMDDHHmmssSSS") + randomNumber(4);
				var productType = "";
				var moneyAmount = payment;
				var servicesNameList = [];
				var typeNameFlag = options.type;

				if(ads.hasOwnProperty("productType")) {
					productType = ads.productType;
				}

				if(ads.hasOwnProperty("servicesNameList")) {
					servicesNameList = ads.servicesNameList;
				}

				var shopcart = {
					userId: Meteor.userId(),
					relationId: relationId,
					productType: ads.productType,
					typeNameFlag: ads.typeNameFlag,
					moneyAmount: moneyAmount,
					servicesNameList: servicesNameList,
					payed: false,
					canceled: false,
					finished: false,
					host: 'KYLPC',
					createTime: new Date()
				}
				ShopCart.insert(shopcart, function (err) {
					if (err) {
						log('AddHhShopcart:add service to shopcart error', err);
					} else {
						log('AddHhShopcart:add service to shopcart succeed');
					}
				})
			}
		}
	}
})