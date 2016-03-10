
Template.FinanceMenu.rendered = function() {
  $("#financeTag").addClass('active').siblings().removeClass("active");
}


Template.FinanceHandle.rendered = function () {

	var financeType = $('.financeType li.active').attr('data-finance');
  var financeService = $('.financeService li.active').attr('data-service');
	Session.set('financeType', financeType);
  Session.set('financeService', financeService);
	setTimeout(function () {
		$('.financePeriod li').first().addClass('active').siblings().removeClass("active");
    var financePayment = $('.financePeriod li').first().attr('data-payment');
    Session.set('financePayment', financePayment);
	}, 100)
}


Template.FinanceTypeList.events({
	"click li.typeName": function (event, template) {
		$(event.currentTarget).addClass('active').siblings().removeClass("active");
    var url = $(event.currentTarget).find('a').attr('href');
    Router.go(url);
	}
})



Template.finance.events({
	'click .financeType li': function (event) {
		var financeTypeHtml = event.currentTarget;
		$(financeTypeHtml).addClass("active").siblings().removeClass("active");
		var financeType = $(financeTypeHtml).attr('data-finance');
		Session.set('financeType', financeType);

		setTimeout(function () {
			$('.financePeriod li').first().addClass('active').siblings().removeClass("active");
      var periodType = $('.financePeriod li').first().html();
      Session.set('periodType', periodType);
      var financePayment = $('.financePeriod li').first().attr('data-payment');
      Session.set('financePayment', financePayment);      
		}, 100);
	},

	'click .financeService li': function (event, template) {
		var financeServiceHtml = event.currentTarget;
		$(financeServiceHtml).addClass("active").siblings().removeClass("active");
    var financeService = $(financeServiceHtml).attr('data-service');
    Session.set('financeService', financeService);

    if(financeService !==3) {
	    setTimeout(function () {
	      $('.financePeriod li').first().addClass('active').siblings().removeClass("active");
	      var periodType = $('.financePeriod li').first().html();
	      Session.set('periodType', periodType);
	      var financePayment = $('.financePeriod li').first().attr('data-payment');
	      Session.set('financePayment', financePayment);      
	    }, 100);
    } else {
    	
    }
    
	},

  'click .financePeriod li': function(event, template) {
    $(event.currentTarget).addClass('active').siblings().removeClass("active");
    var periodType = $(event.currentTarget).html();
    Session.set('periodType', periodType);
    var financePayment = $(event.currentTarget).attr('data-payment');
    Session.set('financePayment', financePayment);  
  }

});

//----------------------------------------------------------------------
Template.finance.events({
	'click #buy': function (event) {
		if(Meteor.userId()) {
			var financeTypeName = $('.financeType li.active').html();
			var financeService = $('.financeService li.active').attr("data-service");
			var financeServiceName = $('.financeService li.active').html();
      var periodType = $('.financePeriod li.active').html();
			var financePayment = $('#financePayment').html();
			var productType = "财务代理";
			var typeNameFlag = "finance";
			var services = [];
			if (!financeService || !financeTypeName || !financePayment || !periodType) {
				$("[id=financeError]").html("请选择服务!");
				$("[id=financeError]").show();
			} else {
				if(financeService === 3) {
					services = [
						{
							productType: productType,
							typeNameFlag: typeNameFlag,
							moneyAmount: financePayment,
							servicesNameList: [
							{
								name: financeTypeName + "-" + financeServiceName,
								money: financePayment,
								scale: 1,
								servicesContains: []								
							}
							]							
						}
					]
				} else {
					services = [
						{
							productType: productType,
							typeNameFlag: typeNameFlag,
							moneyAmount: financePayment,
							servicesNameList: [
								{
									name: financeTypeName + "-" + financeServiceName + "-" + periodType,
									money: financePayment,
									scale: 1,
									servicesContains: []
								}
							]
						}
					]
				}

				if(services.length >=1) {
					Meteor.call('shopcartAdd', services, function (err) {
						if (err) {
							$("[id=financeError]").html("加入购物车失败!");
							$("[id=financeError]").show();

						} else {
							Router.go('/shopcart')
						}
					});
				}
			}	
		} else {
			UserHandle();
		}
	}

})

//----------------------------------------------------------------------
Template.FinanceHandle.helpers({
	financePayment: function () {
		return Session.get('financePayment');
	},
	financeList: function() {
		var financeType = Session.get("financeType") || "small";
		var financeService = Session.get("financeService") || 1;
		return FinanceLists.findOne({
			financeType: financeType,
			serviceType: financeService
		})
	}	
})


Template.FinanceHandle.onRendered(function(){
  $(".hint1 .overlook").click(function(){
     $(".ui.modal.hint1").modal("show");
  })
  $(".hint2 .overlook").click(function(){
     $(".ui.modal.hint2").modal("show");
  })  
})
//----------------------------------------------------------------------
