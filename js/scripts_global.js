$(document).ready(function() {

	$("#hamburger a").bind("click", function(event) {

		event.preventDefault();
		$("body").addClass("menu");

	});

	$("#content-overlay").bind("click", function(event) {

		event.preventDefault();
		$("body").removeClass("menu");

	});

});