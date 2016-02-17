//----------------------------------------------------

function log(info) {
  console.log('-------------------------------------')
  var len = arguments.length;
  for(var i =0; i < len; i++) {
    console.log(arguments[i]);
  }
}


//----------------------------------------------------

Meteor.methods({
  'OrderAddPerson': function(orderOptions) {
    function OrderPersonAdd(callback) {
    var orderId = orderOptions.orderId || "";
    var legalPersonName = orderOptions.legalPersonName || "";
    var legalPersonId = orderOptions.legalPersonId || "";
    var legalPersonPhone = orderOptions.legalPersonPhone || "";
    var legalPersonTel = orderOptions.legalPersonTel || "";
    var legalPersonEmail = orderOptions.legalPersonEmail || "";
    var supervisorName = orderOptions.supervisorName || "";
    var supervisorId = orderOptions.supervisorId || "";
    var userId = orderOptions.userId || "";
      if(userId && orderId && legalPersonName 
        && legalPersonPhone && legalPersonEmail
        && legalPersonId && supervisorName 
        && supervisorId) {
        Orders.update({orderId: orderId, userId: userId}, {
          $set: {
            legalPerson: {
              legalPersonName: legalPersonName,
              legalPersonId: legalPersonId,
              legalPersonPhone: legalPersonPhone,
              legalPersonTel: legalPersonTel,
              legalPersonEmail: legalPersonEmail
            },
            supervisor: {
              supervisorName: supervisorName,
              supervisorId: supervisorId
            }
          }
        }, function(err) {
          if(err) {
            log('update order person information error', err);
            callback(err);
          } else {
            log('update order person information succeed');
            callback(null);
          }
        })
    } else {
      var err = 'person information not complately';
      log(err);
      callback(err);
    }
  }

  var orderPerson = Async.wrap(OrderPersonAdd);
  var response = new orderPerson();
  return response;
}
})


//----------------------------------------------------

Meteor.methods({
  'CompanyContractorHandle': function(options) {
    function ContractorHandle(callback) {
      var IdReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      var PhoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if(!options || !options.orderId 
        || !options.userId
        || !options.liaisons 
        || !IdReg.test(options.liaisons.liaisonsId) 
        || !PhoneReg.test(options.liaisons.liaisonsPhone) 
        || !EmailReg.test(options.liaisons.liaisonsEmail)
        || !options.financialStaff
        || !IdReg.test(options.financialStaff.financialStaffId) 
        || !PhoneReg.test(options.financialStaff.financialStaffPhone) 
        || !EmailReg.test(options.financialStaff.financialStaffEmail)) {
        var err = 'contractor information not complately';
      callback(err);    
    } else {
      var orderId = options.orderId;
      var liaisons = options.liaisons;
      var financialStaff = options.financialStaff;

      Orders.update({orderId: orderId, userId: options.userId}, {
        $set: {
         contractor: {
          liaisons: liaisons,
          financialStaff: financialStaff
        }
      }
    }, function(err) {
      if(err) {
        log('update contractor information error', err);
        callback(err);
      } else {
        log('update contractor information succeed');
        callback(null);
      }
    })
    }
  }
  var contractorHandle = Async.wrap(ContractorHandle);
  var response = new contractorHandle();
  return response;
}
})


Meteor.methods({
  "UpdateCompanyMoney": function(options) {
    function UpdateMoney(callback) {
      if(!options || !options.userId || !options.orderId || !options.companyMoney) {
        log("company money options not complately", options);
        var err = "参数错误"
        callback(null, {status: 0, message: '参数错误,更新失败！'});
      } else {
        var order = Orders.findOne({orderId: options.orderId, userId: options.userId});
        if(order) {
          if(order.hasOwnProperty("holders") && order.holders instanceof Array) {
            var holders = order.holders;
            var currentHoldersMoney = 0;
            holders.forEach(function(holder) {
              if(holder.hasOwnProperty("money")) {
                if(typeof(money) !== 'number') {
                  var money = parseInt(holder.money) || 0;
                  currentHoldersMoney += money;
                } else {
                  currentHoldersMoney += holder.money || 0;
                }
              }
            });
            if(typeof(options.companyMoney) !== 'number') {
              var companyMoney = parseInt(options.companyMoney) || 0;
            } else {
              var companyMoney = options.companyMoney || 0;
            }

            if(companyMoney <  currentHoldersMoney) {
              log("money amount is less than holders provided");
              callback(null, {status: 0, message: "当前资金必须大于股东提供资金"});
            } else {
              Orders.update({
                orderId: options.orderId,
                userId: options.userId
              }, {
                $set: {
                  companyMoney: options.companyMoney
                }
              }, function(err) {
                if(err) {
                  log("update company money amount error", err);
                  callback(null, {status: 0, message: "数据库更新失败，请重试！"});
                } else {
                  log("update company money amount succeed");
                  callback(null, {status: 1, message: "注册资本更新成功！"});
                }
              })
            }
          } else {
            Orders.update({
              orderId: options.orderId,
              userId: options.userId
            }, {
              $set: {
                companyMoney: options.companyMoney
              }
            }, function(err) {
              if(err) {
                log("update company money amount error", err);
                callback(null, {status: 0, message: "数据库更新失败，请重试！"});
              } else {
                log("update company money amount succeed");
                callback(null, {status: 1, message: "注册资本更新成功！"});
              }
            })            
          }
        } else {
          log('you do not have permition to access the order');
          callback(null, {status: 0, message: "当前订单操作不合法，注册资本更新失败！"});
        }
      }
    }
    var updateMoney = Async.wrap(UpdateMoney);
    var response = new updateMoney();
    return response;
  }
})


//----------------------------------------------------

Meteor.methods({
  'updateIndustry': function(industryOptions) {
    function IndustryHandle (callback) {
      var orderId = industryOptions.orderId || "";
      var userId = industryOptions.userId || "";
      var industryBig = industryOptions.industryBig || "";
      var industrySmall = industryOptions.industrySmall || "";
      var businessScope = [];
      var business = Business.findOne({industryBig: industryBig, industrySmall: industrySmall});
      if(business) {
        businessScope = business.content;
      }

      if(businessScope.length > 0 && industryOptions && orderId && industryBig !== null && industrySmall !== null && industryBig !== "" && industrySmall !== "" && userId) {

        Orders.update({orderId: orderId, userId: userId}, {
          $set: {
            industryBig: industryBig,
            industrySmall: industrySmall,
            businessScope: businessScope
          }
        }, function(err) {
          if(err) {
            var err = 'update industry type error';
            log(err);
            callback(err);
          } else {
            log('update industry type succeed');
            callback(null);
          }
        });

      } else {
        var err = 'update industry type error, check you parameters';
        log(err);
        callback(err);
      }      
    }

    var industryHandleWrap = Async.wrap(IndustryHandle);
    var response = new industryHandleWrap();
    return response;
  }
})



//----------------------------------------------------
Meteor.methods({
  'UpdateIndustryDetail': function(options) {
    var orderId = options.orderId;
    var userId = options.userId;
    var contents = options.contents;

    if(options && userId && orderId 
      && contents instanceof Array ) {
      Orders.update({orderId: orderId, userId: options.userId}, {
        $pushAll: {
          businessScope: contents
        }
      }, function(err) {
        if(err) {
          log('Add business scope error');
        } else {
          log('Add business scope succeed')
        }
      })
  }
}
})
//----------------------------------------------------

Meteor.methods({
  'EditScope': function(options) {
    function EditIndustryScope(callback) {
     var orderId = options.orderId;
     var contents = options.contents;
     var userId = options.userId;

     if(options && orderId && userId 
      && contents instanceof Array ) {
      Orders.update({orderId: orderId, userId: userId}, {
       $set: {
        businessScope: contents
      }
    }, function(err) {
     if(err) {
      log('Edit business scope error');
      callback(err);
    } else {
      log('Edit business scope succeed')
      callback(null);
    }
  })
  }	
}

var wrapScope = Async.wrap(EditIndustryScope);
var response = new wrapScope();
return response;	
}
})


//----------------------------------------------------
Meteor.methods({
  'OrderAddHolders': function(options) {

    function HoldersHandle( callback) {
      var orderId = options.orderId;
      var holders = options.holders;
      var userId = options.userId;
      console.log(orderId, userId, holders)
      if(options && orderId && userId
        && holders instanceof Array ) {
        Orders.update({orderId: orderId, userId: options.userId}, {
          $pushAll: {
            holders: holders
          }
        }, function(err) {
          if(err) {
            log('Add holders error');
            callback(err);
          } else {
            log('Add holders succeed')
            callback(null);
          }
        })
    }      
  }
  var holderHandleWrap = Async.wrap(HoldersHandle);
  var response = new holderHandleWrap();
  return response;
}
})



//---------------------------------------------------
//下面的代码是 做股东信息添加，做验证处理
// function verifyPercent(percent) {
//   var numReg = /^\d+$/;
//   var flag = true;
//   if(!percent.match(numReg)) {
//     flag = false;
//   } else {
//     if(typeof(percent) === 'string') {
//       if(parseInt(percent) < 0 || parseInt(percent) > 100) {
//         flag = false;
//       }
//     };
//     if(typeof(percent) === 'number') {
//       if(percent < 0 || percent > 100) {
//         flag = false;
//       }
//     } 
//   }
//   return flag;
// };

// function verifyMoney(money) {
//   var numReg = /^\d+$/;
//   var flag = true;
//   if(!money.match(numReg)) {
//     flag = false;
//   }
//   return flag;
// }


// Meteor.methods({
//   'OrderAddHolders': function(options) {

//     function HoldersHandle( callback) {
//       if(!options || !options.userId || !options.holderId || !options.holder || !options.holder.holderName || !verifyPercent(options.holder.moneyPercent) || !verifyMoney(options.holder.money)) {
//         log("holder options not legal", options);
//         callback(null, {status: 0, message: "股东信息不合法，请重新填写"});
//       } else {

//         if(typeof(options.holder.moneyPercent) === 'string') {
//           var moneyPercent = parseInt(options.holder.moneyPercent);
//         } else {
//           var moneyPercent = options.holder.moneyPercent;
//         }

//         var order = Orders.findOne({userId: options.userId, orderId: options.orderId});
//         if(!order) {
//           log("当前订单不能访问，请联系开业啦咨询！");
//           null(null, {status: 0, message: '当前订单不能访问，请联系开业啦咨询！'});
//         } else {
//           if(!order.hasOwnProperty('companyMoney')) {
//             var holders = order.holders || [];
//             var allPercent = 0;
//             holders.forEach(function(hol) {
//               if(hol.hasOwnProperty("moneyPercent")) {
//                 if(typeof(hol.moneyPercent) === 'string') {
//                   hol.moneyPercent = parseInt(hol.moneyPercent);
//                 }
//                 allPercent += hol.moneyPercent;
//               }
//             })
//             if(allPercent < options.moneyPercent) {
//               log("holder money percent is more than 100%")
//             }

//             Orders.update({userId: userId, orderId: orderId}, {
//               $push: {
//                 "holders": options.holder
//               }
//             }, function(err) {
//               if(err) {
//                 log("update holder error", err);
//                 callback(null, {status: 0, message: '更新股东信息失败！'});
//               } else {
//                 log("update holder information succeed");
//                 callback(null, {status: 1, message: "更新股东信息成功！"})
//               }
//             })
//           } else {
//           }
//         }
//       }
//     }
//   }
// })



//----------------------------------------------------
Meteor.methods({
  'UpdateCompanyName': function(options) {
    function UpdateName(callback) {
      if(options && options.userId &&  options.orderId && options.companyName && options.companyName) {
        var orderId = options.orderId;
        var userId = options.userId;
        var companyName = options.companyName;

        Orders.update({orderId: orderId, userId: userId}, {
          $set: {
            companyName: companyName
          }
        }, function(err) {
          if(err) {
            log('update company name error', err);
            callback(err);
          } else {
            log('update company name succeed');
            callback(null);
          }
        })
      } else {
        var err = 'update company name error, for the information you provided not valid';
        log(err);
        callback(err);
      }      
    }

    var updateNameHandle = Async.wrap(UpdateName);
    var response = new updateNameHandle();
    return response;
  }
})

//----------------------------------------------------

Meteor.methods({
	'CancelOrder': function(cancelOrder) {
		if(cancelOrder && cancelOrder.hasOwnProperty('relationId')) {
			var relationId = cancelOrder.relationId;
			Orders.update({relationId: relationId}, {
       $set: {
        canceled: true
      }
    }, {
      multi: true
    }, function(err) {
      if(err) {
       log('cancel order error', err);
     } else {
       log('cancel order succeed!');
     }
   })		
		} else {
			log('cancel order error for your order information bad!');			
		}	
	}
});


Meteor.methods({
  "deleteHolder": function(options) {
    if(!options || !options.userId ||  !options.orderId || !options.holderId) {
      console.log("delete holder failed for options illegal");
    } else {
      var orderId = options.orderId;
      var holderId = options.holderId;
      if(typeof(holderId) === 'number') {
        holderId = holderId.toString();
      }
      Orders.update({
        orderId: orderId,
        userId: options.userId
      },{
        $pull: {
          holders: {holderId: holderId}
        }
      },  function(err) {
        if(err) {
          console.log("delete holder error");
          console.log(err);
        } else {
          console.log("delete holder succeed");
        }
      })
    }
  }
})


Meteor.methods({
  "UserCommitCheck": function(options) {
    function CommitCheck(callback) {
      if(!options || !options.userId || !options.orderId) {
        log("check order information options illegal", options);
        var err = "check order information options illegal";
        callback(err, {status: false})
      } else {
        var userId = options.userId;
        var orderId = options.orderId;
        var order = Orders.findOne({userId: options.userId, orderId: orderId});
        if(!order) {
          var err = "can not find order , check again";
          callback(null, {status: false});
        } else {
          var propertiesLists = ['userId', 'productType', 'typeNameFlag', 'servicesNameList', 'addressInfo', 'holders', 'industryBig', 'industrySmall', 'businessScope', 'companyName', 'consigner', 'contractor', 'legalPerson', 'companyMoney'];
          var flag = checkObjProperties(order, propertiesLists);
          if(!flag) {
            var err = "information not complately, can not commit";
            log(err);
            callback(null, {status: false});
          } else {
            callback(null, {status: true});
          }
        }
      }      
    }
    var commitCheck = Async.wrap(CommitCheck);
    var response = new commitCheck();
    return response;
  }
})


function checkObjProperties(object, propertiesLists) {
  var flag = true;
  var length = propertiesLists.length;
  for(var i = 0; i < length; i++) {
    if(!object.hasOwnProperty(propertiesLists[i])) {
      flag = false;
    }
  }
  return flag;
}



Meteor.methods({
  "UserCommitOrder": function(options) {
    function CommitOrder(callback) {
      console.log('user commit order')
      if(options && options.userId && options.orderId) {
        var orderId = options.orderId;
        var userId = options.userId;
        Orders.update({
          userId: userId,
          orderId: orderId
        }, {
          $set: {
            userConfirmed: true
          }
        }, function(err) {
          if(err) {
            log("confirm order [" + orderId + "] error", err);
            callback(err, {status: false});
          } else {
            log("user confirm the order[" + orderId + "]");
            callback(null, {status: true});
          }
        })
      } else {
        var err = 'commit order parameters not complately';
        log(err, options);
        callback(null, {status: false});
      }      
    }
    var commitOrder = Async.wrap(CommitOrder);
    var response = new commitOrder();
    return response;
  }
})




Meteor.methods({
  "UpdateOrderConsigner": function(options) {
    function UpdateConsigner(callback) {
      var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      var PhoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;  
      if(!options || !options.userId || !options.orderId || !options.consignerName || !EmailReg.test(options.consignerEmail) || !PhoneReg.test(options.consignerPhone)) {
        var err = "consigner information not complately";
        log(err, options);
        callback(err, {status: 0, message: err});
      } else {
        var orderId = options.orderId;
        var consigner = {
          consignerName: options.consignerName,
          consignerPhone: options.consignerPhone,
          consignerEmail: options.consignerEmail
        };

        Orders.update({orderId: orderId, userId: options.userId}, {
          $set:{
            consigner: consigner
          }
        }, function(err) {
          if(err) {
            log("update order consigner error", err);
            callback(err, {status: 0, message: err});
          } else {
            log("update order consigner succeed");
            callback(null, {status: 1, message: "update consigner succeed"});
          }
        })
      }    
    };
    var updateConsigner = Async.wrap(UpdateConsigner);
    var response = new updateConsigner();
    return response;
  }
})














