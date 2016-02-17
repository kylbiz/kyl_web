Template.checkname.events({
  "click .search": function(event, template) {
    $('.resultMoreL').empty();
    var keywords = $('.keywords').val();
    var uuid = Meteor.uuid();
    if(keywords && keywords.length >=2 ) {
      Meteor.call('crawlerRegistration', keywords,  uuid, function(err, results) {
        if(!err) {
          Router.go('/checkname?uuid=' + uuid + '&keywords=' + keywords);
        }
      });

    } else {
      $('#keywordsError').html("关键词至少为两个字符");
      $("#keywordsError").show();
    }
  }
})



Template.checkname.events({
  "focus input": function(event, template) {
    $("#keywordsError").hide();
  } 

})



Template.checkname.events({
  "click #btn-more": function(event, template) {
    var keywords = template.$("[id=keywordsL]").text() || "";
    var allpageNo = template.$("[class=allpageNo]").text() || "";
    var currentpage = parseInt(template.$("[class=currentpage]").text()) ;
    var alreadyhasCompanyNum = parseInt(template.$("[class=registrationsLength]").text()) ;
    var nextpage = currentpage + 1;
    if(typeof keywords === 'string' && keywords.length >= 2  && allpageNo >= nextpage) {
    Meteor.call('getMoreRegistrations', keywords, allpageNo, nextpage, function(err, moreRegistrations) { 

      var companyInformation = moreRegistrations.detailResultsOutputs; 
      var companylength = companyInformation.length;

      for(var i = 0 ; i < companylength; i++) {
        var companyInfo = companyInformation[i];
        var company = companyInfo.company;
        var basicDetail = companyInfo.basicDetail;
        var companyMore =  '<div class="resultModel resultMoreL">'
          + '<div class="title">'
          + company.companyName 
          + '</div>'
          + '<div class="content">'
          + '<div class="address row">'
          + '<span class="holder">地址：</span>'
          + company.address
          + '</div>'
          + '<div class="status row">'
          + ' <span class="holder">企业状态：</span>'
          + company.companyStatus
          + '</div>'
          + ' <div class="info">'
          + '<button type="button" class="btn btn-sm btn-default" style="float:right;">'
          + '详细信息'
          + '</button>'
          + '<div class="ui modal range">'
          + '<i class="icon close"></i>'
          + '<div class="header">'
          + '详细信息'
          + '</div>'
          + '<div class="image content">'
          + '<div class="description">'
          + '<ul>'


        var basicDetailLength = basicDetail.length;
        var detailStr = '';
        basicDetail.forEach(function(detail) {
          var key = detail.key;
          var value = detail.value;
          detailStr += '<li>' + key + ' &nbsp; ' + value + ' </li>';
        })

        companyMore += detailStr 
        + '</ul>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        template.$('.allpageNo').before(companyMore);
      }
      template.$("[class=currentpage]").text(nextpage)
      template.$("[class=registrationsLength]").text(alreadyhasCompanyNum + companylength)
      if(parseInt(template.$("[class=currentpage]").text())  >= parseInt(allpageNo)) {
        template.$("[id=btn-more]").remove()
      } 
      });
    }
  }
});

Template.registrationResult.rendered=function(){
  $(document).ready(function(){
    
    $(document).on("click","#unique .close",function(){
      $("#unique").modal('hide');
    })
    
    $(document).on("click",".resultModel .btn",function(){
      var object = $(this);
      var bolck = object.closest('.resultModel').find('.modal').first();
      var content=$(bolck).html();
      $("#unique").html(content);
      $("#unique").modal('show');
    })
    
    
  })
}

Template.defaultCheck.rendered=function(){
  $(document).ready(function(){
    $(document).on("click",".resultModel .btn",function(){
      $(".ui.modal.range.default").modal('show')
    })
  })
}