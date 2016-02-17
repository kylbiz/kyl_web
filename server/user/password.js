Accounts._bcryptRounds = 10;
bcrypt = NpmModuleBcrypt;
var bcryptHash = Meteor.wrapAsync(bcrypt.hash);


//----------------------------------------------------


function log(info) {
  console.log('-------------------------------------')
  var len = arguments.length;
  for(var i =0; i < len; i++) {
    console.log(arguments[i]);
  }
}

// Given a 'password' from the client, extract the string that we should
// bcrypt. 'password' can be one of:
//  - String (the plaintext password)
//  - Object with 'digest' and 'algorithm' keys. 'algorithm' must be "sha-256".
//
var getPasswordString = function (password) {
  if (typeof password === "string") {
    password = SHA256(password);
  } else { // 'password' is an object
    if (password.algorithm !== "sha-256") {
      throw new Error("Invalid password hash algorithm. " +
                      "Only 'sha-256' is allowed.");
    }
    password = password.digest;
  }
  return password;
};



var hashPassword = function (password) {
  password = getPasswordString(password);
  return bcryptHash(password, Accounts._bcryptRounds);
};



function codeVerification(phone, code, timestamp) {
  if(phone && code && timestamp) {
    var userCode = UserCode.findOne({phone: phone});
    if(userCode) {
      var createTime = userCode.createTime;
      var _code = userCode.code;
      var timeLegal = (timestamp - createTime) <= 180 * 1000 || false;
      if(code.toLowerCase() === _code.toLowerCase() && timeLegal) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}



Meteor.methods({
  "changeUserPassword": function(options) {
    function ChangePassword(callback) {
      if(!options || !options.username || !options.password || !options.verifyCode) {
        log("password options not completely", options);
        callback(null, {status: 0, message: "参数错误，请确定之后重试！"});
      } else {
        var username = options.username;
        var password = options.password;
        var verifyCode = options.verifyCode;

        var codeLegal = codeVerification(username, verifyCode, Date.now());
        if(codeLegal) {
          var user = Meteor.users.findOne({username: username});
          var t1 = hashPassword(password);
          var t2 = hashPassword(password);
          log(t1, t2, t1 === t2)
          if(user['services']['password']['bcrypt'] === hashPassword(password)) {
            log("user password the same as current password");
            callback(null, {status: 0, message: "当前密码与原密码一致！"})
          } else {
            Meteor.users.update({
              username: username
            }, {
              $set: {
                "services.password.bcrypt": hashPassword(password)
              }
            }, function(err) {
              if(err) {
                log("update user [" + username +  "] password error", err);
                callback(err, {status: 0, message: "修改密码失败！"});
              } else {
                log("update user [" + username +  "] password succeed");
                callback(null, {status: 1, message: "修改密码成功"});
              }
            })            
          }
        } else {
         log("code not exists or time out");
         callback(null, {status: 0, message: "验证码失效或错误，请重试！"}) 
        }    
      }
    }
    var changePassword = Async.wrap(ChangePassword);
    var response = new changePassword();
    return response;
  }
})

