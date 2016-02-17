Router.configure({
    layoutTemplate: 'layout',
    yieldTemplates: {
        'header': {to: 'header'},
        'footer': {to: 'footer'}
    },
    //subscriptions: function(){
    //    this.subscribe('notifies');
    //},
    notFoundTemplate: 'notFoundTemplate',
    loadingTemplate: 'loading'
})

Router.map(function(){
    this.route('notFound', {
        path: '/404',
        template: 'notFoundTemplate'
    });

    //全局页面
    this.route('/', {name:'homepage'});
    this.route('aboutus', {name: 'aboutus'});
    this.route('contactus', {name: 'contactus'});
    this.route('joinus', {name: 'joinus'});
    this.route('help', {name: 'help'});
    this.route('faq', {name: 'faq'});

    //栏目页面
    this.route('speedup');//创业加速器
    //this.route('services');//服务
    //this.route('http://z.kyl.biz', {name: 'wiki'});//知识库
    this.route('basecamp');//创业大本营

    //产品和服务
    this.route('yiyuan', {name: 'yiyuan'});//一元
    this.route('jisu', {name: 'jisu'});//极速
    this.route('waizi', {name: 'waizi'});//外资
    this.route('yingshi', {name: 'yingshi'});//影视
    this.route('shipin', {name: 'shipin'});//食品
    this.route('jiaoyu', {name: 'jiaoyu'});//教育
    this.route('dianshang', {name: 'dianshang'});//电商
    this.route('FTA', {name: 'FTA'});//自贸区
    this.route('weixianpin', {name: 'weixianpin'});//危险品
    this.route('yiliaoqixie', {name: 'yiliaoqixie'});//医疗器械
    this.route('hulianwang', {name: 'hulianwang'});// 互联网公司注册

    this.route('jizhang', {name: 'jizhang'});
    this.route('yinhang', {name: 'yinhang'});
    this.route('zhuce', {name: 'zhuce'});
    
});

Router.onBeforeAction(function(){
    var useragent = navigator.userAgent;
    //if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    //    // 这里警告框会阻塞当前页面继续加载
    //    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
    //    // 以下代码是用javascript强行关闭当前页面
    //    var opened = window.open('http://www.kyl.biz', '_self');
    //    opened.opener = null;
    //    opened.close();
    //}Router.onBeforeAction(function(){
    $(window).scrollTop(0);
    this.next();
})
