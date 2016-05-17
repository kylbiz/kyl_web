var fs = Npm.require('fs');
fd = process.env.PWD ;
files = fs.readdirSync(process.env.PWD + '/private');
// SSR.compileTemplate('registration', Assets.getText('registration.html'));

// console.log('Start\n');
files.forEach(function(fileName){

  var tName = fileName.split('.')[0];
  var tDir = fileName;
  SSR.compileTemplate(tName, Assets.getText(tDir) );
  tName = '';
  tDir = '';

});
var companyRegiste = [
   {
     name: 'special',
     label: '特价区',
     services: [
       {zone: '松江', payment: 1, message: '仅限文创类'},
       {zone: '金山', payment: 1, message: '仅限电商贸易类'},
     ],
   },
   {
     name: 'hot',
     label: '郊区',
     services: [
       {zone: '浦东(临港)', payment: 500, message: '不接受金融、投资类，需要办理行业许可证请另外咨询'},
       {zone: '奉贤', payment: 500, message: '不接受金融、投资类，需要办理行业许可证请另外咨询'},
       {zone: '松江', payment: 500, message: '不接受金融、投资类，需要办理行业许可证请另外咨询'},
       {zone: '青浦', payment: 500, message: '不接受金融、投资类，需要办理行业许可证请另外咨询'},
       {zone: '金山', payment: 500, message: '不接受金融、投资类，需要办理行业许可证请另外咨询'},
       {zone: '嘉定', payment: 500, message: '不接受金融、投资类，注册资本300万以上请另外咨询'},
       {zone: '崇明', payment: 500, message: '不接受贸易、文化娱乐（音乐创作、影视文化）行业'},
     ]
   },
   {
     name: 'downtown',
     label: '市区',
     services: [
       {zone: '普陀', payment: 1000, message: '不接受教育、培训、金融、投资类，需要办理行业许可证请另外咨询'},
       {zone: '虹口', payment: 1000, message: '不接受信息咨询、金融、投资类，需要办理行业许可证请另外咨询'},
       {zone: '杨浦', payment: 1000, message: '仅限科技行业，需要办理行业许可证请另外咨询'},
       {zone: '长宁', payment: 1500, message: '不接受贸易、金融、投资类，需要办理行业许可证请另外咨询'},
       {zone: '浦东(三林)', payment: 1000, message: '不接受金融、投资类，需要办理行业许可证请另外咨询'},
     ]
   },
   // {
   //   name: 'fta',
   //   label: '自贸区',
   //   services: [
   //     {zone: '外高桥', payment: 8000, message: '没有行业限制'},
   //     {zone: '张江', payment: 3000, message: '仅限科技行业'},
   //     {zone: '陆家嘴', payment: 3000, message: '没有行业限制'},
   //   ]
   // },
 ];
// var postsData = [
//  {
//    name: 'special',
//    label: '特价!!!!!!区',
//    services: [
//      {zone: '松江', payment: 1, message: '仅限文创类'},
//      {zone: '金山', payment: 1, message: '仅限电商贸易类'},
//    ],
//  },
//   {
//     name: 'Meteor',
//     label: '郊!!区'
//   },
//   {
//     name: 'The Meteor Book',
//     label: '市区'
//   }
// ];
Template.RegistrationHandle.helpers({
  // "RegistrationLists": function() {
  //   return RegistrationLists.find();
  // },
  "RegistrationLists": JSON.stringify(companyRegiste),

  // "RegistrationList":function(){
  //   var name = Session.get("productType");
  //   return RegistrationLists.findOne({name: name});
  // },
  // "amount": function() {
    // return Session.get("amount");
  // },
  // "notify": function() {
  //   return Session.get("notify");
  // }
})

Template.RegistrationHandle.helpers({
  "imgURI": function() {
    var productTypeName = Session.get("productTypeName");

    var imgURI = 'registration';
    switch (productTypeName) {
      case 'year2016':
        imgURI += '14.jpg';
        break;
      case 'touzi':
        imgURI += '15.png';
        break;
      case 'jisu':
        imgURI += '04.jpg';
        break;
      case 'dianshang':
        imgURI += '05.jpg';
        break;
      case 'jiaoyu':
        imgURI += '06.jpg';
        break;
      case 'jinrong':
        imgURI += '07.jpg';
        break;
      case 'yidong':
        imgURI += '08.jpg';
        break;
      case 'wenhua':
        imgURI += '09.jpg';
        break;
      case 'shangwu':
        imgURI += '10.jpg';
        break;
      case 'jianzhu':
        imgURI += '11.jpg';
        break;
      case 'yiliao':
        imgURI += '12.jpg';
        break;
      case 'qita':
        imgURI += '13.jpg';
        break;
      default:
        imgURI += '04.jpg';
        break;
    }
    return imgURI;
  }
})

// Template.license.helpers({
//   "licenseTypeLists": function() {
//     var licenseType = Session.get("licenseType") || "urban";
//     return  LicenseLists.findOne({type: licenseType});
//   },
//   // "licenseTypeLists": postsData,
//
//   "paymentL": function() {
//     return Session.get("payment") || 0;
//   }
// })
//
// Template.registration.helpers({
//   "otherHandle": function() {
//     return Session.get("others");
//   }
// })
//
// Template.RegistrationHandle.helpers({
//   "paymentL": function() {
//     return Session.get("payment");
//   },
//   "messageL": function() {
//     return Session.get("message");
//   }
// });
//
// Template.RegistrationTypeList.helpers({
//   productTypeName: function() {
//     return Session.get("productTypeName");
//   }
// })
