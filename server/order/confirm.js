function log(info) {
  console.log('-------------------------------------')
  var len = arguments.length;
  for(var i =0; i < len; i++) {
    console.log(arguments[i]);
  }
}



Meteor.methods({
  'userAddressAdd': function(addressOptions) {
    if(Meteor.userId()) {
      console.log('userAddressAdd');
      var address = addressOptions.address || "";
      var phone = addressOptions.phone || "";
      var tel = addressOptions.tel || "";
      var zipcode = addressOptions.zipcode || "";
      var receiver = addressOptions.receiver || "";
      if(address && (phone || tel)) {
        UserAddress.insert({
          userId: Meteor.userId(),
          receiver: receiver,
          address: address,
          phone: phone,
          tel: tel,
          zipcode: zipcode,
          createAt: new Date()
        }, function(err) {
          if(err) {
            log('Add user address error', err);
          } else {
            log('Add user address succeed');
          }
        });
      } else {
        log('user address information not completely');
      }
    } else {
      log('user not login');
    }
  },
  'updateUserAddress': function(addressOptions) {
    if(Meteor.userId()) {
      var address = addressOptions.address || "";
      var phone = addressOptions.phone || "";
      var tel = addressOptions.tel || "";
      var zipcode = addressOptions.zipcode || "";
      var receiver = addressOptions.receiver || "";    
      var addressId = addressOptions.addressId || "";
      if(address && receiver && addressId && (phone || tel)) {
        UserAddress.update({_id: addressId}, {
          $set: {
            address: address,
            zipcode: zipcode,
            receiver: receiver,
            phone: phone,
            tel: tel            
          }
        }, function(err) {
          if(err) {
            log('update user address error', err);
          } else {
            log('update user address succeed')
          }
        })

      }else {
        log('the address you proviced is not completely');
      }

    } else {
      log('user not login');
    }
  }
})



Meteor.methods({
	'deleteAddress': function(addressId) {
		function AddressDelete(callback) {
			if( Meteor.userId() && addressId) {
				UserAddress.remove({_id: addressId}, function(err) {
					if(err) {
						log('delete address[' + addressId + '] error' , err);
						callback(err);
					} else {
						log('delete address[' + addressId + '] succeed');
						callback(null);
					}
				})	
			} else {
				var err = 'delete user address error';
				log('delete user address error');
				callback(err);
			}				
		}
		var addressDetete = Async.wrap(AddressDelete);
		var response = new addressDetete();
		return response;
	}
})

