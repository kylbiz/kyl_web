
var appId = '595e34c0-4185-4b60-ae67-afd7f8af3577';
var appSecret = '104364d4-d8a2-4da0-8fc6-a6c595343e20';


//----------------------------------------------------------
function log(info) {
  console.log('-------------------------------------')
  var len = arguments.length;
  for (var i = 0; i < len; i++) {
    console.log(arguments[i]);
  }
}

//----------------------------------------------------------

function randomNumber(number) {
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var str = "";
  for(var i = 0; i < number; i++) {
    pos = Math.round(Math.random() * (arr.length -1));
    str += arr[pos];
  }
  return str;
}

//----------------------------------------------------------


HTTP.methods({
  "webhook": function(data) {
    console.log("Hi, I\'am webhook");

    var body = data;
    var sign = body.sign || "";
    var timestamp = body.timestamp || "";

    var checkStr = appId + appSecret + timestamp;
    var checkSign = CryptoJS.MD5(checkStr).toString()

    if(checkSign == sign) {
      var openid = body.transaction_id || "";
      var payed = false;
      var transaction_type = body.transaction_type;
      var tradeSuccess = body.tradeSuccess || false;

      log('transaction_type = ' + transaction_type);

      var temp_paylog = PayLogs.findOne({openid: openid});
      if(!temp_paylog
        || !temp_paylog.hasOwnProperty("payed")
        || temp_paylog.payed === true) {
        log("webhook: not allowed to update pay logs for parameters illegal", data);
      } else {

        if(transaction_type == 'PAY' && tradeSuccess == true) {
          payed = true;
        }

        if (payed) {
          PayLogs.update({
            openid: openid
          }, {
            $set: {
              payed: true,
              payedTime: new Date(),
              payInfos: body
            }
          }, function (err) {
            if (err) {
              log('update pay logs for pay information error', err);
            } else {
              log('update pay logs for pay information succeed');
            }
          });

          var paylog = PayLogs.findOne({openid: openid});
          if (paylog && paylog.hasOwnProperty('shoplists')) {
            var addressInfo = paylog.addressInfo || {};
            var shoplists = paylog.shoplists;
            var invoice = paylog.invoice || false;
            shoplists.forEach(function (shoplist) {
              var relationId = shoplist.relationId;
              ShopCart.update({
                relationId: relationId
              }, {
                $set: {
                  payed: true,
                  openid: openid,
                  invoice: invoice,
                  payedTime: new Date()
                }
              }, {
                multi: true
              }, function (err) {
                if (err) {
                  log('update shopcart for pay information error', err);
                } else {
                  log('update shopcartfor pay information succeed');
                  var carts = ShopCart.find({
                    relationId: relationId
                  });
                  carts.forEach(function (cart) {
                    cart.addressInfo = addressInfo;
                    cart.cartId = cart._id;
                    delete cart._id;
                    var orderId = moment(new Date()).format('YYYYMMDDHHmmssSSSS') + randomNumber(4);
                    cart.orderId = orderId;
                    cart.invoice = invoice || false;

                    Orders.insert(cart, function (err) {
                      if (err) {
                        log('generate order error', err);
                      } else {
                        log('generate order succeed');
                      }
                    })
                  })
                }
              });
            });
          } else {
            log('no such pay logs or pay log information error');
          }
          // 通知相关人员有新的订单
          SMSSend.orderNotice(openid, 'KYLPC');
        } else {
          PayLogs.update({
            openid: openid
          }, {
            $set: {
              payInfos: data
            }
          }, function (err) {
            if (err) {
              log('update pay logs for pay information error', err);
            } else {
              log('update pay logs for pay information succeed');
            }
          });
        };
      }
      return 'success';
    } else {
      return 'fail';
    }
  }
});

//----------------------------------------------------------

