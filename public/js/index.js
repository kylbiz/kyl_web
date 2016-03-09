$(document).ready(function() {

 // $("#happyOpen").modal("show");
  
 // setTimeout(function(){
 //  $("#happyOpen").modal("hide");
 // },7200);
   
 // $(".close-btn").click(function(){
 //   $("#happyOpen").modal("hide");
 // });
  

  $('.slider').bxSlider({
    auto: true,
    controls: true,
    speed: 480
  });

  $('.segement-list').first().find(".box").hover(function() {
    var index = $(this).index(".segement-list .box") + 1;
    var className = "bg" + index;
    $(".mask>div").removeClass().addClass(className);
  });

  $(".index-btn").hover(function() {
      $(this).find(".phone-right").addClass("slideInLeft").show();
    },
    function() {
      $(this).find(".phone-right").hide().removeClass("slideInLeft");
    }
  )

  $('#count-number').countTo();
  $('#o-count-number').countTo();
  var slidey = $('.diff-content').unslider({
    autoplay: false,
    easing: 'swing',
    speed: 0
  });
  var data = slidey.data('unslider');
  $(".btn-container .left-btn").click(function() {
    data.next();
  });

  $(".icon1").hover(function() {
    $(this).find(".qrcode").addClass("slideInLeft").show();
  }, function() {
    $(this).find(".qrcode").hide().removeClass("slideInLeft");
  })

  $(".icon3").hover(function() {
    $(this).find(".telephone").addClass("slideInRight").show();
  }, function() {
    $(this).find(".telephone").hide().removeClass("slideInRight");
  })

  $("#helper .icon-4").hover(function() {
    $(this).find(".qrcode").addClass("slideInRight").show();
  }, function() {
    $(this).find(".qrcode").hide().removeClass("slideInRight");
  })

  $("#helper .icon-5").hover(function() {
    $(this).find(".telephone").addClass("slideInRight").show();
  }, function() {
    $(this).find(".telephone").hide().removeClass("slideInRight");
  })

  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  $("#toTop").click(function() {
    $('body,html').animate({
        scrollTop: 0
      },
      1000);
    return false;
  });


});