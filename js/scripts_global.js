var body_cache;

$(document).ready(function() {

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