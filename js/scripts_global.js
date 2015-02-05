var body_cache, window_cache;

$(document).ready(function() {

	window_cache = $(window);
	body_cache = $("body");

	$("#hamburger a").bind("click", function(event) {

		event.preventDefault();
		$("body").addClass("menu");

	});

	$("#content-overlay").bind("click", function(event) {

		event.preventDefault();
		$("body").removeClass("menu");

	});

});