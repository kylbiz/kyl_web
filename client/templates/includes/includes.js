Template.howtoservice.onRendered(function () {
	$('[data-toggle="popover"]').popover();

	$(".pro-address li").click(function(){
		$(".pro-address li").removeClass("cur");
		$(this).addClass("cur");
		$(".gszcMoney").text(  $(this).children("span").data("money") );
    $(".btn-ewm").attr("data-content",$(this).children('span').data('ewm'));
	})
})

Template.header.onRendered(function () {
  //活动页左侧滑动菜单
	var mouse_btn=$(".left-nav-befor"),
        cl_header_area=$(".left-nav-after"),
        celan_po_ab=$(".left-nav"),
        celan=$(".celan");
    mouse_btn.bind("mouseenter",function(){
        celan.stop().animate({"left":"0"});
        celan_po_ab.stop().animate({"opacity":"100","time":500});
        cl_header_area.stop().animate({"opacity":"100"});
        $(this).stop().animate({"opacity":"0"},function(){
            $(this).css("display","none");
        })
    });
    cl_header_area.bind("mouseleave",function(){
        celan.stop().animate({"left":"-212"},function(){
            mouse_btn.css("display","block");
            mouse_btn.stop().animate({"opacity":"1"},300);
        });
        cl_header_area.stop().animate({"opacity":"0"});

    });
    $('.close-a').click(function(){
        $('.kefu').removeClass("zoomInDown").addClass("rollOut");
    });
	$(".drop-nav").hover(function(){
		t = setTimeout(function(){
			$(".drop-nav").children(".nav-down").stop(false, true).slideDown();
		}, 200);
	},function(){
		clearTimeout(t);
		$(".drop-nav").find(".nav-down").stop(false, true).slideUp("fast");
	})

	$("#back").hide();
	$(function () {
		$(window).scroll(function(){
			if ($(window).scrollTop()>100){
				$("#back").fadeIn(1500);
			}else{
				$("#back").fadeOut(500);
			}
		});
		$("#back").click(function(){
			$('body,html').animate({scrollTop:0},1000);
			return false;
		});
	});
});
