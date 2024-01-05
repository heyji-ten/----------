var ui = {};

// Dim
ui.dimShow = function(){ /* 딤드 show */
	$("body").addClass("dim");
}
ui.dimHide = function(){ /* 딤드 hide */
	$("body").removeClass("dim");
}
ui.fullPopup = function(){ //팝업
	var $openBtn = $(".full_open"),
		$closeBtn = $(".full_pop .closed");
	
	$('.full_pop').each(function() {
		$(this).attr('tabindex', '0');
	});

	var $btn = null;

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		$btn = $(this);
		var target = $(this).attr("open-full-pop") || e;
		var layer = $(".full_pop" + "." + target);

		console.log(layer)

		if(layer.find('.tab_title').length) {
			layer.addClass('tab_style');
		}
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
		var target= $(this).closest(".full_pop");
		target.fadeOut(150).removeClass("on");
		ui.dimHide();
		$btn = $btn ?? $(this);
		$btn.focus();
	});
}

$(function () {
    $(".full_pop").length && ui.fullPopup(); //팝업
});