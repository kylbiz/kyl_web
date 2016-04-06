//----------------------------------------------------

function log(info) {
  console.log('-------------------------------------')
  var len = arguments.length;
  for (var i = 0; i < len; i++) {
    console.log(arguments[i]);
  }
}



function randomWord(randomFlag, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}


function randomNumber(number) {
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var str = "";
  for (var i = 0; i < number; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}





var appId = "595e34c0-4185-4b60-ae67-afd7f8af3577";
var appSecret = "104364d4-d8a2-4da0-8fc6-a6c595343e20";
var return_url = "http://www.kyl.biz/spay/result"; //可选，默认为http://payservice.beecloud.cn/spay/result.php

//----------------------------------------------------
function genBCPaySign() {
  var return_str = CryptoJS.MD5(appId + title + amount + out_trade_no + appSecret).toString();
  return return_str;
}

//----------------------------------------------------

Meteor.methods({
  "ShopListsPayOptions": function(shoplistOptions) {
    var openid = randomWord(false, 40);
    var title = [];
    var out_trade_no = openid; //自定义订单号
    var trace_id = Meteor.userId(); //自定义购买者id
    function ShopPayOptions(callback) {
      if (shoplistOptions && shoplistOptions.hasOwnProperty('shoplists') && shoplistOptions.hasOwnProperty('addressId')) {
        var shoplists = shoplistOptions.shoplists;
        var addressId = shoplistOptions.addressId;
        var couponId = shoplistOptions.couponId;
        var invoice = shoplistOptions.invoice || false;
        var addressInfo = UserAddress.findOne({
          _id: addressId
        });
        if (addressInfo) {
          delete addressInfo._id;
          delete addressInfo.createTime;
        };

        if (Meteor.userId() && shoplists.length > 0) {
          var moneyAmount = 0;
          var relationIdLists = [];

          shoplists.forEach(function(shoplist) {
            var relateionId = shoplist.relateionId;
            var money = shoplist.money;
            if (typeof money === 'string') {
              money = parseInt(money) || 0;
            } else if (money instanceof Array) {
              money = money;
            } else {
              money = 0;
            }
            moneyAmount += money;
            var servicedetail = shoplist.servicedetail || shoplist.servicename;
            // var servicedetail = shoplist.servicename;
            title.push(shoplist.servicename);

            relationIdLists.push(shoplist.relationId);
          });

          var _title_temp = '开业啦产品：' + title.toString().slice(0, 130).replace(/\+/g, "|") || "开业啦创业服务";

          console.log("_title_temp", _title_temp)

          //--------------------------------------
          moneyAmount = moneyAmount * 100; // use cents

          var sign = CryptoJS.MD5(appId + _title_temp + moneyAmount + out_trade_no + appSecret).toString(); //商品信息hash值，32位小写，含义和生成方式见下文
          var optional = {
            relationIdLists: relationIdLists.toString(),
            invoice: invoice
          };

          var options = {
            title: _title_temp,
            amount: moneyAmount,
            out_trade_no: out_trade_no,
            trace_id: trace_id,
            sign: sign,
            return_url: return_url,
            optional: optional

          }
          console.log(options);

          var paylogOptions = {
            openid: openid,
            userId: Meteor.userId(),
            shoplists: shoplists,
            moneyAmount: moneyAmount,
            payed: false,
            addressInfo: addressInfo,
            invoice: invoice || false,
            createTime: new Date()
          };

          PayLogs.insert(paylogOptions, function(err) {
            if (err) {
              log('generate pay logs error', err);
              callback(err, null);
            } else {
              log('generate pay logs succeed, openid[' + openid + ']');
              callback(null, options);
            }
          })
        } else {
          var err = 'shoplists should not null';
          log(err);
          callback(err, null);
        }
      }
    }
    var PayOptions = Async.wrap(ShopPayOptions);
    var response = new PayOptions();
    return response;
  }
})



Meteor.methods({
  'updatePayLogs': function(options) {
    if (options && options.is_success) {
      var is_success = options.is_success || false;
      var openid = options.out_trade_no || "";
      var subject = options.subject || "";
      var payed = false;
      if (is_success === 'T') {
        payed = true;
      }

      if (payed) {
        PayLogs.update({
          openid: openid
        }, {
          $set: {
            payed: true,
            payedTime: new Date(),
            alipayInfos: options
          }
        }, function(err) {
          if (err) {
            orderId = moment(new Date()).format('YYYYMMDDHHmmssSSSS');
            log('update pay logs for alipay error', err);
          } else {
            log('update pay logs for alipay succeed');
          }
        });

        var paylog = PayLogs.findOne({
          openid: openid
        });
        if (paylog && paylog.hasOwnProperty('shoplists')) {
          var addressInfo = paylog.addressInfo || {};
          var shoplists = paylog.shoplists;
          shoplists.forEach(function(shoplist) {
            var relationId = shoplist.relationId;
            ShopCart.update({
              relationId: relationId
            }, {
              $set: {
                payed: true,
                openid: openid,
                payedTime: new Date()
              }
            }, {
              multi: true
            }, function(err) {
              if (err) {
                log('update shopcart for pay information error', err);
              } else {
                log('update shopcartfor pay information succeed');
                var carts = ShopCart.find({
                  relationId: relationId
                });
                carts.forEach(function(cart) {
                  cart.addressInfo = addressInfo;
                  cart.cartId = cart._id;
                  delete cart._id;
                  var orderId = moment(new Date()).format('YYYYMMDDHHmmssSSSS') + randomNumber(4);
                  cart.orderId = orderId;

                  Orders.insert(cart, function(err) {
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
      } else {
        PayLogs.update({
          openid: openid
        }, {
          $set: {
            alipayInfos: options
          }
        }, function(err) {
          if (err) {
            log('update pay logs for alipay error', err);
          } else {
            log('update pay logs for alipay succeed');
          }
        });
      }
    } else {
      log('payLogs options error');
    }
  }
})
