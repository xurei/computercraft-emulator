(function ($) {
	$popup_overlay = $('.popup-overlay');
	$('.about-link').click(function () {
		$('#about-page').addClass('active');
	});
	
	keys_locked = false;
	$(document).keydown(function (e) {
		var _this = this;
		if (keys_locked || e.target.tagName === "INPUT") {
			return true;
		}
		setTimeout(function () {
			return keys_locked = false;
		}, 100);
		keys_locked = true;
		switch (e.keyCode) {
			case 27:
				$('.keybind-esc').click();
			break;
		}
	});
	
	$('.popup-close').click(function () {
		console.log("ok");
		$(this).parents('.popup-overlay').removeClass('active');
	});
})(jQuery);