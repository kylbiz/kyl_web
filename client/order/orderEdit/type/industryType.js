Template.industryType.helpers({
  'industryBigLists': function() {
    // Meteor.subscribe('getBusinessTypeLists');

    var typeLists = BusinessTypeLists.find();
    return typeLists;
  },
  'industrySmallLists': function() {
    var industryBig = Session.get('industryBig') || "";
    var self = this;
    self.industrySmall = [];
    // Meteor.subscribe('getIndustrySmall', industryBig);

    var businesses = Business.find({industryBig: industryBig});
    if(businesses.count()) {
      businesses.forEach(function(business) {
        var businessObj = {
          name: business.industrySmall
        }
        self.industrySmall.push(businessObj);
      })
    };
    return self.industrySmall;
  }
}) 



Template.industryType.events({
  'change #industryBig': function(event) {
    $("#industrySuccess").hide();
    $("#industryError").hide();
    var industryBig = $('#industryBig').val() || "";
    if(industryBig !== null) {
      Session.set('industryBig', industryBig);
    }
  },
  "change #industrySmall": function(event) {
    $("#industrySuccess").hide();
    $("#industryError").hide();
  },
  'click #industryBtn': function(event) {
    $("#industrySuccess").hide();
    $("#industryError").hide();
    var industryBig = $('#industryBig').val() || "";
    var industrySmall = $('#industrySmall').val() || "";
    var orderId = Session.get('orderId') || "";
    var userId = Meteor.userId();
    if(userId && orderId && industryBig !== null && industrySmall !== null && industryBig !== "" && industrySmall !== "") {
      var industryOptions = {
        userId: userId,
        orderId: orderId,
        industryBig: industryBig,
        industrySmall: industrySmall
      };

      Meteor.call('updateIndustry', industryOptions, function(err) {
        if(err) {
          $("[id=industryError]").html("提交行业信息失败,请重新填写!");           
          $("[id=industryError]").show();            
        } else {
          $("[id=industrySuccess]").html("提交行业信息成功!");           
          $("[id=industrySuccess]").show();            
        } 
      })
    }
  }
});


// Meteor.subscribe('IndustryLists');

Template.addRange.helpers({
  'serviceTypeList': function() {
    var business1 = Business1.findOne({businessBig: '服务类'});
    if(business1) {
      return business1.businessSmall
    }
  },
  'salesTypeList': function() {
    var business1 = Business1.findOne({businessBig: '销售类'});
    if(business1) {
      return business1.businessSmall
    }    
  }

})
