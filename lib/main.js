var fs;
if(Meteor.isServer) {
  fs = Meteor.npmRequire('fs');
}
fd = process.env.PWD ;
files = fs.readdirSync(process.env.PWD + '/private');
// SSR.compileTemplate('registration', Assets.getText('registration.html'));

// console.log(files);
files.forEach(function(fileName){

  var tName = fileName.split('.')[0];
  var tDir = fileName;
  // console.log(tName + tDir);
  SSR.compileTemplate(tName, Assets.getText(tDir) );
  // console.log(Blaze.isTemplate(Template.BankMenu));
  tName = '';
  tDir = '';

});
// console.log(Blaze.isTemplate(Template.BankHandle));
// var htmla = SSR.render("bank");
    // console.log(htmla);
 var financeAgent = [
    {
      name: 'zero',
      label: '零申报套餐',
      payment: 79,
      period: {
        name: 'period',
        label: '时间',
        items: [
          {label: '12个月', value: 12},
          {label: '6个月', value: 6},
        ]
      }
    },
    {
      name: 'common',
      label: '普通行业套餐',
      opts: {
        'annualIncome': {
          name: 'annualIncome',
          label: '年收入',
          items: [
            {label: '≥500万', name: 'gte500', value: 579},
            {label: '101-499万', name: '101to499',value: 379},
            {label: '≤100万', name: 'lte100', value: 179},
          ],
        },
        'certiNum': {
          name: 'certiNum',
          label: '凭证量',
          items: [
            {label: '＞300张', name: 'gt300', value: 579},
            {label: '≤300张', name: 'lte300', value: 379},
            {label: '≤120张', name: 'lte120', value: 179},
          ]
        }
      },
      period: {
          name: 'period',
          label: '时间',
          items: [
            {label: '6个月', value: 6},
            {label: '12个月', value: 12},
          ]
      }
    },
  ];

var companyRegiste = [
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
   {
     name: 'special',
     label: '特价区',
     services: [
       {zone: '松江', payment: 1, message: '仅限文创类'},
       {zone: '金山', payment: 1, message: '仅限电商贸易类'},
     ],
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
});
Template.FinanceHandle.helpers({
  "financeAgent": JSON.stringify(financeAgent),
});

Template.BankHandle.helpers({
  // "bankList":
});


Template.BankMenu.rendered = function () {
  $("#financeTag").addClass('active').siblings().removeClass("active");
}
Template.BankMenu.onRendered(function(){
  $(".overlook").click(function(){
    $('.ui.modal.photo')
    .modal('show')
  });
});
//----------------------------------------------------------------------

Template.BankHandle.helpers({
  "banks":[
  {
    name:'中国银行',
    price: 300
  },
  {
    name:'招商银行',
    price: 300
  },
  {
    name:'上海银行',
    price: 300
  },
  {
    name:'工商银行',
    price: 300
  },
  {
    name:'建设银行',
    price: 300
  }],
  // pay: function () {
  //   if (!Session.get('payment')) {
  //     Session.set('payment', BankLists.find().fetch()[0].payment);
  //   }
  //   return Session.get('payment');
  // }
});

Template.BankHandle.events({
  "click .banklist li": function (event, template) {
    $(event.currentTarget).addClass('active').siblings().removeClass("active");
    // Session.set('payment', $(event.currentTarget).data('payment') || 0);
  }
})

//----------------------------------------------------------------------

Template.bank.events({
  "click #buy": function (event, template) {
    if (Meteor.userId()) {
      var bankName = $(".banklist li.active").first().html();
      var payment = $("#payment").html();
      var baseService = $("#baseService").html() || "";
      var services = [];
      if (bankName && payment) {
        services = [
          {
            productType: "银行开户",
            typeNameFlag: 'bank',
            moneyAmount: payment,
            servicesNameList: [
              {
                name: bankName,
                money: payment,
                scale: 1,
                servicesContains: [
                  {name: baseService}
                ]
              }
            ],
          }
        ];
        Meteor.call('shopcartAdd', services, function (err) {
          if (err) {
            $("[id=bankError]").html("加入购物车失败!");
            $("[id=bankError]").show();

          } else {
            Router.go('/shopcart');
          }
        });

      } else {
        $("[id=bankError]").html("请选择开户银行!");
        $("[id=bankError]").show();
      }
    } else {
      UserHandle();
    }
  }
})


//----------------------------------------------------------------------

// Template.RegistrationHandle.events({
//   //添加购物车
//   "click .AddShopcart": function (event, template) {
//     if (Meteor.userId()) {
//       var zone = $('.zoneSelect li.active').html();
//       if (zone) {
//         var services = [];
//         var productTypeName = Session.get('productTypeName');
//         var moneyAmount = $("#moneyAmount").html();
//         var baseService = $("#baseService").html();
//         if (zone && baseService && productTypeName && moneyAmount) {
//           services = [
//             {
//               productType: productTypeName,
//               moneyAmount: moneyAmount,
//               isRegistration: true,
//               zone: zone,
//               isMainProduct: true,
//               servicesNameList: [{
//                 name: baseService
//               }]
//             },
//             {
//               productType: baseService,
//               moneyAmount: 0,
//               isMainProduct: false,
//               isRegistration: true,
//               zone: zone
//             }
//           ];

//           Meteor.call('shopcartAdd', services, function (err) {
//             if (err) {
//               $("[id=orderError]").html("加入购物车失败!");
//               $("[id=orderError]").show();

//             } else {
//               Router.go('/shopcart')
//             }
//           });
//         }

//       } else {
//         $("[id=orderError]").html("请选择注册区域");
//         $("[id=orderError]").show();
//       }
//     } else {
//       UserHandle();
//     }
//   }
// })

//----------------------------------------------------------------------


// Template.RegistrationHandle.helpers({
//   "imgURI": function() {
//     var productTypeName = Session.get("productTypeName");

//     var imgURI = 'registration';
//     switch (productTypeName) {
//       case 'year2016':
//         imgURI += '14.jpg';
//         break;
//       case 'touzi':
//         imgURI += '15.png';
//         break;
//       case 'jisu':
//         imgURI += '04.jpg';
//         break;
//       case 'dianshang':
//         imgURI += '05.jpg';
//         break;
//       case 'jiaoyu':
//         imgURI += '06.jpg';
//         break;
//       case 'jinrong':
//         imgURI += '07.jpg';
//         break;
//       case 'yidong':
//         imgURI += '08.jpg';
//         break;
//       case 'wenhua':
//         imgURI += '09.jpg';
//         break;
//       case 'shangwu':
//         imgURI += '10.jpg';
//         break;
//       case 'jianzhu':
//         imgURI += '11.jpg';
//         break;
//       case 'yiliao':
//         imgURI += '12.jpg';
//         break;
//       case 'qita':
//         imgURI += '13.jpg';
//         break;
//       default:
//         imgURI += '04.jpg';
//         break;
//     }
//     return imgURI;
//   }
// })

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
