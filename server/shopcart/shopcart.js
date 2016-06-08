//----------------------------------------------------

function log(info) {
	console.log('-------------------------------------')
	var len = arguments.length;
	for (var i = 0; i < len; i++) {
		console.log(arguments[i]);
	}
}

//----------------------------------------------------

Meteor.methods({
	shopcartAdd: function (services) {
		function CartAdd(callback) {
			log(Meteor.userId(), services instanceof Array)
			if (Meteor.userId() && services instanceof Array) {
				var date = new Date();
				function randomNumber(number) {
				  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
				  var str = "";
				  for(var i = 0; i < number; i++) {
				    pos = Math.round(Math.random() * (arr.length -1));
				    str += arr[pos];
				  }
				  return str;
				}
				var relationId = moment(date).format("YYYYMMDDHHmmssSSS") + randomNumber(4);

				services.forEach(function (service) {
					var productType = service.productType || "";
					var typeNameFlag = service.typeNameFlag || "";
					var moneyAmount = service.moneyAmount || 0;
					var servicesNameList = service.servicesNameList;
					var shopcart = {
						userId: Meteor.userId(),
						relationId: relationId,
						productType: productType,
						typeNameFlag: typeNameFlag,
						moneyAmount: moneyAmount,
						servicesNameList: servicesNameList,
						payed: false,
						canceled: false,
						finished: false,
						host: 'KYLPC',
						createTime: new Date()
					}
					if(typeNameFlag === 'registration') {
						shopcart.productProgress = {
							status: 0
						}
					}

					ShopCart.insert(shopcart, function (err) {
						if (err) {
							log('add service to shopcart error', err);
							callback(err);
						} else {
							log('add service to shopcart succeed');
							callback(null);
						}
					})
				})
			} else {
				var err = 'service not an array';
				log(err);
				callback(err);
			}
		}
		var cartAdd = Async.wrap(CartAdd);
		var response = new cartAdd();
		return response;
	}
})


//----------------------------------------------------
//Delete shop cart item
Meteor.methods({
	DeleteShopCartItem: function(relationId) {
		log(relationId);
		if(Meteor.userId() && relationId) {
			ShopCart.remove({relationId: relationId}, function(err) {
				if(err) {
					log('remove shopcart item error');
				} else {
					log('remove shopcart item succeed');
				}
			});
		}
	}
})



//----------------------------------------------------



