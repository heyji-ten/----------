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