function handleKeywords(keywords, zone) {
  // var keywordsLength = keywords.length;

  if(typeof keywords === 'string' && keywords.length >= 2) {
     zone = zone || '上海'; // we only use this for shanghai province , china

    if(keywords.indexOf(zone) >= 0) {
      if(keywords.length >= 4) {
        return {flag: true, searchKeywords: [keywords]};
      } else {
        return {flag: false, searchKeywords: []};
      }
    } else {
      searchKeywords = [zone + keywords, keywords + '（' + zone + '）'];
      return {flag: true, searchKeywords: searchKeywords}
    }
  } else {
    return {flag: false, searchKeywords: []}

  }
}


Router.route('checkname', {
  subscriptions: function() {
    var uuid = this.params.query.uuid || "";
    var keywords = this.params.query.keywords || "";
    Meteor.subscribe('getRegistrations', keywords);
    Meteor.subscribe('getCompanySearchRecords', uuid);
  },
	data: function() {
	 var uuid = this.params.query.uuid || "";

   if(uuid) {
      var searchRecords = CompanySearchRecords.findOne({uuid: uuid});
      if(searchRecords) {
        var keywords = searchRecords.keywords;
          var zone = '上海';
          var keywordsHandleResults =  handleKeywords(keywords, zone);
          var keywordsArray = keywordsHandleResults.searchKeywords;
                 
          var keywordsString = '';          
          for(var i = 0; i < keywordsArray.length-1; i++) {
             keywordsString += keywordsArray[i] + '|'; 
          }
          keywordsString += keywordsArray[keywordsArray.length -1];


          var registrations = Registration.find({companyName: new RegExp(keywordsString)});
          var registrationsLength = registrations.count();

          var readyflag = searchRecords.readyflag || false;
          var handledflag = searchRecords.handledflag || false;
          var numberOfResults = searchRecords.numberOfResults || 0;
          var allpageNo = searchRecords.allpageNo  || 0;

          return {
            hasResults:true,
            keywords: keywords,
            registrations: registrations,
            registrationsLength: registrationsLength,
            allpageNo : allpageNo,
            hasnextpage: allpageNo > 1,
            readyflag: readyflag,
            handledflag: handledflag || true ,
            numberOfResults: numberOfResults      
          }        
      }
   } else {
    return {
      hasResults: false
    }
   }
	}
});








