var head = '<head>'
            + '\n<title>开业啦（上海）网络技术有限公司</title>'
            + '\n<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />'
            + '\n<link rel="stylesheet" href="/index.min.css">'
            + '\n<link rel="icon" sizes="16x16 32x32" href="/favicon.ico?v=2">'
            + '\n<script charset="utf-8" src="http://wpa.b.qq.com/cgi/wpa.php"></script> '
            + '\n<script src="http://s11.cnzz.com/z_stat.php?id=1254585758&web_id=1254585758" language="JavaScript"></script>'
            + '\n<script src="/js/js-cookie.js"></script>'
            + '\n<script src="/js/jquery-1.11.3.min.js"></script>'
            + '\n<script src="/js/jquery.bxslider.min.js"></script>'
            + '\n<script src="/plugins/unslider.min.js"></script>'
            + '\n<script src="/plugins/countTo.js"></script>'
            + '\n<script src="/js/index.js"></script>'

            + '\n<meta property="og:title" content="开业啦-自助式极速注册，从未有过">'
            + '\n<meta property="twitter:url" content="http://www.kyl.biz/">' 
            + '\n<meta property="og:url" content="http://www.kyl.biz/"> '
            + '\n<meta name="description" content="开公司找开业啦，在线操作，注册公司只需三步，从此告别繁琐流程。让你足不出户开公司。所有业务均为自营，品质有保证，给你真正便捷、透明、高效的服务体验">'
            + '\n<meta property="twitter:description" content="开公司找开业啦，在线操作，注册公司只需三步，从此告别繁琐流程。让你足不出户开公司。所有业务均为自营，品质有保证，给你真正便捷、透明、高效的服务体验">'
            + '\n<meta property="og:description" content="开公司找开业啦，在线操作，注册公司只需三步，从此告别繁琐流程。让你足不出户开公司。所有业务均为自营，品质有保证，给你真正便捷、透明、高效的服务体验">'
            + '\n<meta name="keywords" content="公司注册|银行开户|财税记账|商标注册|社保交金|劳动人事|财务规划|资本导入|孵化器入驻|政策扶持">'
            + '\n</head>\n'


var fs = Meteor.npmRequire("fs");


// console.log(fs);

Meteor.methods({
  "generateindex": function(options){
    console.log("Hi, generateindex.");
    var body = "<body>\n";
    body += options;
    body += "</body>\n"

    var html = "<html>\n";
    html += head ;
    html += body;
    html += "\n</html>"
    // console.log(html)
    // fs.writeFile("../../../../../public/index.html", html, function(err) {
    //   console.log(arguments)
    // });

  }
})
