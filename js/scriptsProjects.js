$(document).ready(function() {

	$("#thumbnails .thumbnails-arrow a").bind("click", function(event) {

		foo = ($("#thumbnails-list").height() / 2);

		if ($(this).attr("data-direction") == "up") {

			$("#thumbnails-list").scrollTo("-=" + foo + "px", 250);

		}

		else if ($(this).attr("data-direction") == "down") {

			$("#thumbnails-list").scrollTo("+=" + foo + "px", 250);

		};

	});

});