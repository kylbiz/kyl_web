Template.FinanceHandle.onRendered(function(){  
  Session.set("financeType",FinanceLists.findOne().financeType);
  Session.set("benchmark",FinanceLists.findOne().brenchmark);
  Session.set("datetimeRange",6);
  var template = this;
   template.autorun(function () {
     Session.set("totalAmount", Session.get("benchmark") * Session.get("datetimeRange"));
   });  
});

Template.FinanceHandle.helpers({
  "certificate":function(){
    return FinanceLists.findOne({financeType:'primary'}).selects.certificate;
  },  
  "income":function(){
    return FinanceLists.findOne({financeType:'primary'}).selects.income;
  },
  "isZero":function(){
    if(Session.get("financeType")=="zero"){
      return true;
    }
    else {
      return false;
    }
  },  
  "benchmark":function(){
    return Session.get("benchmark");
  },
  "totalAmount":function(){
    return Session.get("totalAmount");
  }
});

Template.FinanceHandle.events({
  "click .selection li":function(e) {
    var self = $(e.currentTarget);
    $(self).addClass("active").siblings().removeClass("active");         
  },
  "click #packpage li":function(e){
    var self = $(e.currentTarget);    
    var financeType = $(self).data("type");
    var payment = $(self).data("payment");
    Session.set("financeType",financeType);     
    Session.set("benchmark",payment); 
  },
  "click #income li":function(e) {
    var self = $(e.currentTarget);    
    var thisPayment = $(self).data("payment");   
    var otherPayment = $("#certificate").find("li.active").first().data("payment");           
    Session.set("benchmark",Math.min(thisPayment,otherPayment));
  },
  "click #certificate li":function(e) {
    var self = $(e.currentTarget);    
    var thisPayment = $(self).data("payment"); 
    var otherPayment = $("#income").find("li.active").first().data("payment"); 
    Session.set("benchmark",Math.min(thisPayment,otherPayment));    
  },
  "click #dataTimeRange li":function(e) {
    var self = $(e.currentTarget);
    var datetimeRange = $(self).data("range");
    Session.set("datetimeRange",datetimeRange);    
  }
})

Template.finance.events({
	'click #buy': function (event) {
		if(Meteor.userId()) {
    //类型
			var financeService = Session.get("financeType");      
      var financeTypeName = (financeService=='zero')?"零申报":"普通行业";
    //选择时间  
      var period = Session.get("datetimeRange");
    //显示时间  
      var periodType = period+"个月";      
    //费用
			var financePayment = Session.get("totalAmount");
    //单价
      var benchmark = Session.get("benchmark");
      
			var productType = "财务代理";
			var typeNameFlag = "finance";
			var services = [];
			if (!financeService || !financeTypeName || !financePayment || !periodType) {
				$("[id=financeError]").html("请选择服务!");
				$("[id=financeError]").show();
        return false;
			} 
      
       //零申报
      if(financeService == 'zero') {
        services = [
          {
            productType: productType,
            typeNameFlag: typeNameFlag,
            moneyAmount: financePayment,
            servicesNameList: [
            {
              name: financeTypeName + "-" + periodType,
              money: benchmark,
              scale: period,
              servicesContains: []								
            }
            ]							
          }
        ]
      } 
      //普通行业
      else if(financeService == 'primary'){
        
        //年收入:        
        var incomeName = $("#income li.active").text();  
        //凭证量：  
        var certificateName = $("#certificate li.active").text();           
        var financeServiceName = "年收入" + incomeName+","+"凭证量" + certificateName;        
        services = [
          {
            productType: productType,
            typeNameFlag: typeNameFlag,
            moneyAmount: financePayment,
            servicesNameList: [
              {
                name: financeTypeName + "-" + financeServiceName + "-" + periodType,
                money: benchmark,
                scale: period,
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
        
		} else {
			UserHandle();
		}
	}

});

Template.FinanceHandle.onRendered(function(){
  $(".hint1 .overlook").click(function(){
     $(".ui.modal.hint1").modal("show");
  })
  $(".hint2 .overlook").click(function(){
     $(".ui.modal.hint2").modal("show");
  })  
})