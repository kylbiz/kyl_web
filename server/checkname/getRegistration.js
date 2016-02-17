var Crawler = Meteor.npmRequire('mycrawl').Crawler;

var crawler = new Crawler();
var companyStatusOptions = {
  targetUrl: 'http://www.sgs.gov.cn/shaic/workonline/appStat!toNameAppList.action'
};

var registrationOptions =  {
  homeRefererUrl: 'http://www.sgs.gov.cn/lz/etpsInfo.do?method=index', // The referer url
  registrationResultsUrl: 'http://www.sgs.gov.cn/lz/etpsInfo.do?method=doSearch', // results for keywords url
  registrationDetailUrl: 'http://www.sgs.gov.cn/lz/etpsInfo.do?method=viewDetail' // url for keywords detail
}


function log(info) {
  console.log('------------------------------------------------------------')
  var len = arguments.length;
  for(var i =0; i < len; i++) {
    console.log(arguments[i]);
  }
}


function handleKeywords(keywords, zone) {
  var keywordsLength = keywords.length;

  if(typeof keywords === 'string' && keywordsLength >= 2) {
     zone = zone || '上海'; // we only use this for shanghai province , china

    if(keywords.indexOf(zone) >= 0) {
      if(keywordsLength >= 4) {
        return {flag: true, searchKeywords: [keywords]};
      } else {
        return {flag: false, searchKeywords: []};
      }
    } else {
      searchKeywords = [zone + keywords, keywords + '（' + zone + '）'];
      // alert(searchKeywords)
      return {flag: true, searchKeywords: searchKeywords}
    }
  } else {
    return {flag: false, searchKeywords: []}

  }
}


// use for company registration search
Meteor.publish('getRegistrations', function(keywords) {
  keywords = keywords || ""; 
  var zone = '上海';
  var keywordsHandleResults =  handleKeywords(keywords, zone);
  var keywordsArray = keywordsHandleResults.searchKeywords;
         
  var keywordsString = '';       
  for(var i = 0; i < keywordsArray.length -1; i++) {
      keywordsString += keywordsArray[i] + '|';
      // keywordsArray[i] = new RegExp(keywordsArray[i]);
  }
  keywordsString += keywordsArray[keywordsArray.length -1];

  return Registration.find({
    "companyName": new RegExp(keywordsString)
  });
})


// use for company search records
Meteor.publish('getCompanySearchRecords', function(uuid) {
 return CompanySearchRecords.find({'uuid': uuid});
})


Meteor.publish('getMoreRegistrations', function(keywords, allpageNo, pageNo) {
  function MoreRegistrations(callback) {
    crawler.getMoreRegistrations(registrationOptions, keywords, allpageNo, pageNo, function(err, moreRegistrations) {
      callback(err, moreRegistrations)
    })
  }

  var wrapperMoreRegistrations= Async.wrap(MoreRegistrations);
  var response = wrapperMoreRegistrations();
  return response;
})



Meteor.publish('SingleUserInformation', function() {
    return User.find({});
})






