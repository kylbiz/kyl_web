SMSSend = {};

SMSSend.persons = ['13815070011', '15821414578', '18516222787'];

SMSSend.getParams = function () {
  var config = {
    appId: '8a48b5514a9e4570014a9f1ac45b0115',
    accountSid: '8a48b5514a9e4570014a9f056aa300ec',
    accountToken: '0fe4efa3c2c54a0eb91dbac340aa49cf',
  }

  var timestamp = moment().format('YYYYMMDDHHmmss'); //时间戳

  var auth = new Buffer( config.accountSid + ':' + timestamp ).toString('base64');

  var content = config.accountSid + config.accountToken + timestamp;
  var crypto = Npm.require('crypto');
  var md5 = crypto.createHash('md5');
  md5.update(content);
  var sig = md5.digest('hex').toUpperCase();

  var url = "https://app.cloopen.com:8883/2013-12-26/Accounts/"
      + config.accountSid
      + "/SMS/TemplateSMS?sig="
      + sig;

  return {
    appId: config.appId,
    url: url,
    sig: sig,
    auth: auth
  }
}

SMSSend.send = function (phone, message, tmplStr, callback) {
  var templateId = {
      'verify-code': "11559",
      'notice-order': '76390',
    }[tmplStr] || '';

  var params = SMSSend.getParams();

  HTTP.call("POST", params.url,
    {
      "data":{
        "to": phone,
        "appId": params.appId,
        "templateId": templateId,
        "datas": message,
      },
      "headers":{
        "Accept":"application/json",
        "content-type":"application/json;charset=UTF-8",
        "Authorization":params.auth}
    }, function (err, result) {
      var codeValue = {};
      if(err) {
        log('send verification code error', err);
        codeValue = {
          codestatus: 0,
          message: "发送验证码失败"
        };
      } else {
        log('send verification code succeed');
        codeValue = {
          codestatus: 1,
          message: "验证码发送成功!"
        };
      }
      if (callback) {
        callback(err, codeValue);
      }
    }
  );
};

SMSSend.orderNotice = function (orderOpenId, host) {
  var orders = Orders.find({openid: orderOpenId}).fetch() || [];
  if (!orders) {
    console.log("no order info found");
    return false;
  }

  var productName = '';
  orders.forEach(function (order) {
    if (!productName) {
      productName = order.productType;
    } else {
      productName += "+" + order.productType;
    }
  });
  var customerName = orders[0].addressInfo.receiver;
  var customerPhone = orders[0].addressInfo.phone;

  var phones = SMSSend.persons;
  phones.forEach(function (phone) {
    SMSSend.send(phone, [productName, customerName, customerPhone, {"KYLWX": "开业啦微信端", "KYLWAP": "开业啦移动端", "KYLPC": "开业啦PC端"}[host] || host], 'notice-order');
  });
}

Meteor.methods({
  smsSend: function () {
    // SMSSend.send('18521595051', ['你NB', '我知道'], 'verify-code');
    // SMSSend.orderNotice('1111', 'KYLWAP');
  }
});
