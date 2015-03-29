var body_cache, window_cache, position_timeout;

$(document).ready(function() {

	window_cache = $(window);
	body_cache = $("body");

	$("#hamburger a").bind("click", function(event) {

		event.preventDefault();
		clearTimeout(position_timeout);
		$("body").addClass("position menu");

	});

	$("#content-overlay").bind("click", function(event) {

		event.preventDefault();
		$("body").removeClass("menu");

		position_timeout = setTimeout(function() {

			$("body").removeClass("position");

		}, 400);

	});

});