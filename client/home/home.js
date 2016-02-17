Template.home.rendered=function(){
  $('.slider').bxSlider({
		auto:true,
		controls:true			
	});	
	
	$('.segement-list').first().find(".box").hover(function() {
			var index=$(this).index(".segement-list .box")+1;
		  var className="bg"+index;
      $(".mask>div").removeClass().addClass(className); 
	});
	
	Modernizr.load([
		{
			load: ['/plugins/unslider.min.js','/plugins/countTo.js'],
			complete: function () {
        
        $('#count-number').countTo();
        $('#o-count-number').countTo();
				var slidey=$('.diff-content').unslider({
					autoplay:false,
					easing: 'swing',       
					speed: 0					
				});
    		var data = slidey.data('unslider');				
				$(".btn-container .left-btn").click(function(){
        	data.next();
				});
				
			}
		}
	]);	
	
	$(".index-btn").hover(function () {
	    $(this).find(".phone-right").addClass("slideInLeft").show();
	  },
	  function () {
	    $(this).find(".phone-right").hide().removeClass("slideInLeft");
	  }
  )
}

