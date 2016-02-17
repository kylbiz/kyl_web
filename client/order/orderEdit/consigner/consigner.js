var checkIdCard = function(num) {
  num = num.toUpperCase();

  var cityCode = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };

  if (!cityCode[num.substr(0, 2)]) {
    console.log("地址编码错误");
    return false;
  }
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
    //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
    return false;
  }
  //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  //下面分别分析出生日期和校验位
  var len, re;
  len = num.length;
  if (len == 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    var arrSplit = num.match(re);

    //检查生日日期是否正确
    var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
    var bGoodDay;
    bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      //alert('输入的身份证号里出生日期不对！');
      return false;
    } else {
      //将15位身份证转成18位
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0,
        k;
      num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
      for (k = 0; k < 17; k++) {
        nTemp += num.substr(k, 1) * arrInt[k];
      }
      num += arrCh[nTemp % 11];
      return true;
    }
  }
  if (len == 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    var arrSplit = num.match(re);

    //检查生日日期是否正确
    var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
    var bGoodDay;
    bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      //alert(dtmBirth.getYear());
      //alert(arrSplit[2]);
      //alert('输入的身份证号里出生日期不对！');
      return false;
    } else {
      //检验18位身份证的校验码是否正确。
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var valnum;
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0,
        k;
      for (k = 0; k < 17; k++) {
        nTemp += num.substr(k, 1) * arrInt[k];
      }
      valnum = arrCh[nTemp % 11];
      if (valnum != num.substr(17, 1)) {
        //alert('18位身份证的校验码不正确！应该为：' + valnum);
        return false;
      }
      return true;
    }
  }
  return false;
}




Template.contractor.events({
  'click #submitContractor': function(event, template) {
    var orderId = Session.get('orderId');
    var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var PhoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    var liaisonsName = $("#liaisonsName").val() || "";
    var liaisonsId = $("#liaisonsId").val() || "";
    var liaisonsPhone = $("#liaisonsPhone").val() || "";
    var liaisonsEmail = $("#liaisonsEmail").val() || "";

    var financialStaffName = $("#financialStaffName").val() || "";
    var financialStaffId = $("#financialStaffId").val() || "";
    var financialStaffPhone = $("#financialStaffPhone").val() || "";
    var financialStaffEmail = $("#financialStaffEmail").val() || "";
    var userId = Meteor.userId();


    if (userId && orderId && liaisonsName && checkIdCard(liaisonsId) && PhoneReg.test(liaisonsPhone) && financialStaffName && checkIdCard(financialStaffId) && PhoneReg.test(financialStaffPhone) && EmailReg.test(liaisonsEmail) && EmailReg.test(financialStaffEmail) && financialStaffId !== liaisonsId) {
      var options = {
        userId: userId,
        orderId: orderId,
        liaisons: {
          liaisonsName: liaisonsName,
          liaisonsId: liaisonsId,
          liaisonsPhone: liaisonsPhone,
          liaisonsEmail: liaisonsEmail
        },
        financialStaff: {
          financialStaffName: financialStaffName,
          financialStaffId: financialStaffId,
          financialStaffPhone: financialStaffPhone,
          financialStaffEmail: financialStaffEmail
        }
      };
      Meteor.call('CompanyContractorHandle', options, function(err) {
        if (err) {
          $("[id=contractorError]").html("公司联系人提交错误,确认后请重新提交!");
          $("[id=contractorError]").show();
        } else {
          $("[id=contractorSuccess]").html("公司联系人提交成功!");
          $("[id=contractorSuccess]").show();
        }
      });
    } else {
      if (!orderId) {
        $("[id=contractorError]").html("订单号不存在,请确认后重新提交!");
        $("[id=contractorError]").show();
      } else if (!liaisonsName) {
        $("[id=contractorError]").html("请确认企业联络人姓名信息，再提交!");
        $("[id=contractorError]").show();
      } else if (!checkIdCard(liaisonsId)) {
        $("[id=contractorError]").html("请确认企业联络人身份证为合法身份证信息，再提交!");
        $("[id=contractorError]").show();
      } else if (!PhoneReg.test(liaisonsPhone)) {
        $("[id=contractorError]").html("请确认企业联络人手机号为11位数字，再提交!");
        $("[id=contractorError]").show();
      } else if (!EmailReg.test(liaisonsEmail)) {
        $("[id=contractorError]").html("请确认企业联络人正确邮箱信息，再提交!");
        $("[id=contractorError]").show();
      } else if (!financialStaffName) {
        $("[id=contractorError]").html("请确认财务负责人姓名信息，再提交!");
        $("[id=contractorError]").show();
      } else if (!checkIdCard(financialStaffId)) {
        $("[id=contractorError]").html("请确认财务负责人身份证为合法身份证信息，再提交!");
        $("[id=contractorError]").show();
      } else if (!PhoneReg.test(financialStaffPhone)) {
        $("[id=contractorError]").html("请确认财务负责人手机号为11位数字，再提交!");
        $("[id=contractorError]").show();
      } else if (!EmailReg.test(financialStaffEmail)) {
        $("[id=contractorError]").html("请确认财务负责人正确邮箱信息，再提交!");
        $("[id=contractorError]").show();
      } else if (liaisonsId === financialStaffId) {
        $("[id=contractorError]").html("财务负责人与企业联络人为同一身份证号!");
        $("[id=contractorError]").show();
      } else {
        $("[id=contractorError]").html("请确认联系人信息，再提交!");
        $("[id=contractorError]").show();
      }
    }
  },
  "focus input": function(event, template) {
    $("[id=contractorSuccess]").hide();
    $("[id=contractorError]").hide();
  }
});


Template.companyConsigner.events({
  "click #submitConsigner": function(event) {
    var orderId = Session.get('orderId');
    var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var PhoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    var consignerName = $("#consignerName").val().trim() || "";
    var consignerPhone = $("#consignerPhone").val().trim() || "";
    var consignerEmail = $("#consignerEmail").val().trim() || "";
    var userId = Meteor.userId();

    if (userId && orderId && consignerName && EmailReg.test(consignerEmail) && PhoneReg.test(consignerPhone)) {
      var options = {
        userId: userId,
        orderId: orderId,
        consignerName: consignerName,
        consignerPhone: consignerPhone,
        consignerEmail: consignerEmail
      };
      Meteor.call("UpdateOrderConsigner", options, function(err, result) {
        if (err) {
          $("#consignerError").html("资料对接人信息提交错误，请确认后再提交！");
          $("#consignerError").show();
        } else {
          $("#consignerSuccess").html("资料对接人信息提交成功！");
          $("#consignerSuccess").show();
        }
      })
    } else {
      if (!orderId) {
        $("#consignerError").html("当前订单ID不存在，请确认后再提交！");
        $("#consignerError").show();
      } else if (!consignerName) {
        $("#consignerError").html("资料对接人姓名不正确，请确认后再提交！");
        $("#consignerError").show();
      } else if (!PhoneReg.test(consignerPhone)) {
        $("#consignerError").html("资料对接人手机号不正确，请确认后再提交！");
        $("#consignerError").show();
      } else if (!EmailReg.test(consignerEmail)) {
        $("#consignerError").html("资料对接人邮箱不正确，请确认后再提交！");
        $("#consignerError").show();
      } else {
        $("#consignerError").html("资料对接人信息错误，请确认后再提交！");
        $("#consignerError").show();
      }
    }
  },
  "focus input": function(event, template) {
    $("[id=consignerError]").hide();
    $("[id=consignerSuccess]").hide();
  }

})