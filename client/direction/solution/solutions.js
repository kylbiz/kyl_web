Template.solution.onRendered(function () {
  
    var active=  0; //Session.get('v') || 0;
   $(".classification li").eq(active).addClass("active").siblings().removeClass("active");
   
  $(document).on("click", ".scene-menu .tab",function(){
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $(".scene-content .tab-pane").eq(index).addClass("active").siblings().removeClass("active");
  });
  
  $(document).on("mouseenter",".scene-container .col-sm-4",function(){    
    $(this).find(".hover-content").animate({
      top: 0
    }, 800);    
  });
           
  $(document).on("mouseleave",".scene-container .col-sm-4",function(){    
    $(this).find(".hover-content").animate({
      top: '100%'
    }, 280);   
  });  

  /*
  $(".space-container .box").hover(function () {
    $(this).find(".block").animate({
      right: 0
    }, 1000);
  }, function () {
    $(this).find(".block").animate({
      right: '100%'
    }, 280);
  });
  */
  
  $("ul.xobject").bxSlider({
      pager:false,
      minSlides: 4,
      maxSlides: 4,      
      moveSlides: 1,
      slideWidth: 280,
      slideMargin: 40,
      useCSS: false,
  });  
  
});

// Template.solution.onCreated(function() {

// var params = Params();
// var instance = this;
// var get= params["v"];
// if(get){  
//   var get=parseInt(get);
//   instance.status= new ReactiveVar(get);
// }
// else {
//   instance.status= new ReactiveVar(0);
// }
  
// });

/*
instance.status:
0:移动互联网
1:商务服务
2:文化传播
3:医疗健康
4:电商贸易
5:教育培训
6:金融信息
7:建筑设计
*/

Template.solution.events({
  "click .classification li":function(e,template){
    var object = $(e.currentTarget);
    object.addClass("active").siblings().removeClass("active");

    var index= object.index() || 0;
    Session.set('v', index);
  }
  
});


Template.solution.helpers({
  'dataimg':function(){
    var v = Session.get('v') || 0;
    return parseInt(Session.get('v')) + 1 ;
  },
  sceneL: function() {
    var v = Session.get('v') || 0;
    var m =  parseInt(Session.get('v')) ;
    return m;
  }
  
});



