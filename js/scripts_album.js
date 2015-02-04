var album_image, album_list, album_items, navigator_current;



function album_change (target, direction) {

	if (target == "arrow") {

		if (direction == "prev") {

			if (album_list.current.index() == 0) {

				foo = album_list.size - 1;

			}

			else {

				foo = album_list.current.index() - 1;

			}

		}

		else if (direction == "next") {

			if (album_list.current.index() == (album_list.size - 1)) {

				foo = 0;

			}

			else {

				foo = album_list.current.index() + 1;

			}

		}

		target = album_list.items.eq(foo).find("a");

	};

	album_list.current.removeClass("current");
	target.parent().addClass("current");
	album_list.current = target.parent();

	navigator_name.html(target.attr("data-name"));
	navigator_number.html(album_list.current.index() + 1);
	album_image.css("background-image", "url(" + target.attr("data-image") + ")");

};



$(document).ready(function() {

	album_image = $("#viewer-wrapper");
	album_list = $("#thumbnails-list");
	album_list.items = album_list.find("li");
	album_list.current = album_list.find("li.current");
	album_list.size = album_list.find("li").length;
	album_items = album_list.find("li a");
	navigator_name = $("#navigator #navigator-name");
	navigator_number = $("#navigator #navigator-current");

	album_items.bind("click", function(event) {

		event.preventDefault();
		
		album_change($(this));

	});

	$("#thumbnails .thumbnails-arrow a").bind("click", function(event) {

		event.preventDefault();

		foo = (album_list.height() / 2);

		if ($(this).attr("data-direction") == "up") {

			album_list.scrollTo("-=" + foo + "px", 250);

		}

		else if ($(this).attr("data-direction") == "down") {

			album_list.scrollTo("+=" + foo + "px", 250);

		};

	});

	$("#viewer .viewer-arrow a").bind("click", function(event) {

		event.preventDefault();

		if ($(this).attr("data-direction") == "prev") {

			album_change("arrow", "prev");

		}

		else if ($(this).attr("data-direction") == "next") {

			album_change("arrow", "next");

		};

	});

	$("#navigator-albums").change(function() {

		document.location = location.protocol + '//' + location.host + location.pathname + "?album=" + $(this).val();

	});

	$("#viewer").hammer().bind("swipeleft", function() {

		album_change("arrow", "next");

	}).bind("swiperight", function() {

		album_change("arrow", "prev");

	});

});