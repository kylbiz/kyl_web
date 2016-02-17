function durationDays(startDate, endDate) {
  var start = parseInt(startDate.getTime());
  var end = parseInt(endDate.getTime());

  if(end > start) {
    return Math.floor((end - start) / 1000 / 60 / 60 /24) ;
  } else {
    return 0;
  }
};


Template.orderItem.events({
  'click .progressView': function(event) {
   var view=Blaze.toHTML(Template.progressBox||"");
   $(view).modal('show');
   return false;
    
  }
});

Template.orderItem.events({
  'click .payOrder': function(event) {
    var orderId = $(event.currentTarget).data('orderid') || "";
    var moneyAmount = $(event.currentTarget).data('moneyamount');
    var productType = $(event.currentTarget).data('type')  
    if(orderId && moneyAmount && productType) {
      var payOptions = {
        orderId: orderId,
        moneyAmount: moneyAmount,
        productType: productType
      };

      Meteor.call('GenerationPayOptions', payOptions, function(err, options) {
        if(err) {

        } else {
            BC.err = function(err) {
            console.log(err)
        };

        BC.click(options);
        }
      });
    }
    return false;
  },
	"click .cancel" : function(event, template) {
		var orderHtml = event.currentTarget;
		var orderId = $(orderHtml).attr('data-orderid');
		var relationId = $(orderHtml).attr('data-relationid');
		if(orderId && relationId) {
			var cancelData = {
				orderId: orderId,
				relationId: relationId
			}
			 var view=Blaze.toHTMLWithData(Template.cancelOrder, cancelData);
			 $(view).modal({
				onDeny: function(){				
				},
				onApprove : function() {
					Meteor.call('CancelOrder', cancelData); 			 
				}
			}).modal('show');		
		} else {
			
		}
		return false;	
		
	}
})
