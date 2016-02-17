var Crawler = Meteor.npmRequire('mycrawl').Crawler;

var crawler = new Crawler();

var  registrationOptions =  {
    homeRefererUrl: 'http://www.sgs.gov.cn/lz/etpsInfo.do?method=index', // The referer url
    registrationResultsUrl: 'http://www.sgs.gov.cn/lz/etpsInfo.do?method=doSearch', // results for keywords url
    registrationDetailUrl: 'http://www.sgs.gov.cn/lz/etpsInfo.do?method=viewDetail' // url for keywords detail
  };


var companyStatusOptions = {
  targetUrl: 'http://www.sgs.gov.cn/shaic/workonline/appStat!toNameAppList.action'
};

var registrationStatusOption = {
  targetUrl : 'http://www.sgs.gov.cn/shaic/workonline/appStat!toEtpsAppList.action'
}



function log(info) {
  console.log('------------------------------------------------------------')
  var len = arguments.length;
  for(var i =0; i < len; i++) {
    console.log(arguments[i]);
  }
}

Meteor.onConnection(function(conn) {
    ip = conn.clientAddress || '192.168.0.1';
    clientInfo = conn.httpHeaders['user-agent']
    // log(conn, ip, clientInfo)
    // console.log(conn.clientAddress);
});

var Fiber = Npm.require('fibers');
var Future = Npm.require('fibers/future');
var future = new Future();




Meteor.methods({

  crawlerRegistration: function(keywords, uuid, callback) {
    keywords = keywords||"";
    if(typeof keywords === 'string' && keywords.length >= 2) {
    uuid = uuid || Meteor.uuid()

    // save company search records into database
    Fiber(function() {
      CompanySearchRecords.insert({
        keywords: keywords,
        ip: ip,
        timestamp: new Date(),
        clientInfo: clientInfo,
        numberOfResults: 0,
        allpageNo: 0,
        readyflag: false,
        handledflag: true, // used for click search button flag.
        uuid: uuid,
        server: 'h.kyl.biz'
      }, function(err) {
        if(err) {
          log('save keywords to companySearchRecords error', err);
        } else {
          log('save keywords to companySearchRecords succeed');
        }
      })
    }).run()

    crawler.searchCompanyInformation(registrationOptions, keywords, function(err, registrationsFromServer) {
      if(!err) {
        log('Got registrationsFromServer:', registrationsFromServer , 'Then save to database.');
        var numberOfResults = registrationsFromServer.numberOfResults;
        var allpageNo = registrationsFromServer.allpageNo;
        var registrationResults =registrationsFromServer.detailResultsOutputs; 

        if(numberOfResults !== 0){
          Fiber(function() { // save basic information based on keywords
          registrationResults.forEach(function(registrationResult) {
              var company = registrationResult.company;
              var detailInformation = registrationResult.detailInformation;

              Registration.update({'companyName': company.companyName}, {
                companyName: company.companyName,
                companyQueryId: company.companyQueryId,
                companyStatus: company.companyStatus,
                companyAddress: company.address,
                basicDetail: registrationResult.basicDetail,
                annualCheckDetail: registrationResult.annualCheckDetail,
                createTime: new Date(),
                server: 'www.kyl.biz'
              }, {
                upsert: true
              }, function(err) {
                if(err) {
                  log('save registration error', err);     
                } else {
                  log('save registration succeed.');
                }
              })
            });
          }).run();

          Fiber(function() {
            CompanySearchRecords.update({'keywords': keywords, 'uuid': uuid}, {
              $set: {
                numberOfResults: numberOfResults,
                allpageNo: allpageNo,
                readyflag: true
              }
            }, {
              upsert: true
            }, function(err) {
              if(err) {
                log('Update keywords to companySearchRecords error', err);
              } else {
                log('Update keywords to companySearchRecords succeed');
              }
            })            
          }).run();
        } else {
          log('number of records : 0');

          Fiber(function() {
            CompanySearchRecords.update({'keywords': keywords, 'uuid': uuid}, {
              $set: {
                readyflag: true
              }
            }, {
              upsert: true
            }, function(err) {
              if(err) {
                log('Update keywords to companySearchRecords error', err);
              } else {
                log('Update keywords to companySearchRecords succeed');
              }
            })            
          }).run();   
        }
      }else{
        log('search company information error', err);
      }
    });
    } else {
      log('关键词输入不合法.')    
      return {numberOfResults: 0, registrationResults: []};
    }
  },

  getMoreRegistrations: function(keywords, allpageNo, pageNo) {
    log('getMoreRegistrations', keywords, allpageNo, pageNo)
    
    function MoreRegistrations(callback) {
      crawler.getMoreRegistrations(registrationOptions, keywords, allpageNo, pageNo, function(err, moreRegistrations) {
        callback(err, moreRegistrations)
      })
    }

    var wrapperMoreRegistrations= Async.wrap(MoreRegistrations);
    var response = wrapperMoreRegistrations();
    return response;
  }

});