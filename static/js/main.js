var ui = {};

// Dim
ui.dimShow = function(){ /* 딤드 show */
	$("body").addClass("dim");
}
ui.dimHide = function(){ /* 딤드 hide */
	$("body").removeClass("dim");
}
ui.popup = function(){ //팝업
	var $openBtn = $(".pop_open"),
		$closeBtn = $(".pop-section .closed");
	
	$('.pop-section').each(function() {
		$(this).attr('tabindex', '0');
	});

	var $btn = null;

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		$btn = $(this);
		var target = $(this).attr("open-pop") || e;
		var layer = $(".pop-section" + "." + target);

		console.log(layer)

		layer.fadeIn(150).addClass("on");
		layer.focus();
		ui.dimShow();

		var x = layer.find('> .closed');
		x.on('keydown', function() {
			if (window.event.keyCode === 9) {
				layer.focus();
			}
		});
		

	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".pop-section");
		target.fadeOut(150).removeClass("on");
		ui.dimHide();
		$btn = $btn ?? $(this);
		$btn.focus();
	});
}

$(function () {
    $(".pop-section").length && ui.popup(); //팝업
});

$(document).ready(function () {
    $('.navbar ul li a').on('click', function () {
        $('.navbar ul li').removeClass('active');
        $(this).parent().addClass('active');
        scrollToActive();
    });

    $('.content-section .contents').on('scroll', function () {
        scrollToActive();
    });

    function scrollToActive() {
        $('.divider').each(function () {
            if ($(this).offset().top <= $('.content-section .contents').scrollTop() + $('.content-section .contents').height() &&
                $(this).offset().top + $(this).outerHeight() > $('.content-section .contents').scrollTop()) {
                var dividerId = $(this).attr('id');

                $('.navbar ul li').removeClass('active');
                var activeNav = $('.navbar ul li a[href="#' + dividerId + '"]').parent();
                activeNav.addClass('active');
            }
        });

        // 스크롤바 포커싱 추가
        var activeElement = $('.navbar li.active');
        if (activeElement.length > 0) {
            var navbarHeight = $('.navbar').outerHeight();
            var activeOffset = activeElement.offset().top - $('.navbar').offset().top;
            var activeHeight = activeElement.outerHeight();
            var scrollTop = activeOffset + (activeHeight / 2) - (navbarHeight / 2);

            $('.navbar').stop().animate({
                scrollTop: scrollTop
            }, 500);
        }
    }
});
