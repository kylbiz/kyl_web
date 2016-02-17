Template.footer.rendered=function(){
	
	$(".icon1").hover(function(){
		$(this).find(".qrcode").addClass("slideInLeft").show();
	},function(){
		$(this).find(".qrcode").hide().removeClass("slideInLeft");
	})
	
	$(".icon3").hover(function(){
		$(this).find(".telephone").addClass("slideInRight").show();
	},function(){
		$(this).find(".telephone").hide().removeClass("slideInRight");
	})
	$(document).ready(function(){
		
	$("#helper .icon-4").hover(function(){
		$(this).find(".qrcode").addClass("slideInRight").show();
	},function(){
		$(this).find(".qrcode").hide().removeClass("slideInRight");
	})
	
	$("#helper .icon-5").hover(function(){
		$(this).find(".telephone").addClass("slideInRight").show();
	},function(){
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
}



Template.footer.events({
  "click .icon2": function(event) {
    window.open ('http://weibo.com/kylsh') 
  }
})