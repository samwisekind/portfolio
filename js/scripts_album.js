var album_loader, album_image, album_list, album_items, select_previous, map_cache, navigator_name, navigator_number, map;
var swiped = false;



function album_change (target, direction, int) {

	album_loader.remove();

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

	album_image.loading.removeClass("invisible");
	album_loader = $("<img/>").attr("src", target.attr("data-image")).load(function() {
		
		album_loader.remove();
		album_image.css("background-image", "url(" + target.attr("data-image") + ")");
		album_image.loading.addClass("invisible");

	});

	if (int != true) {

		if (swiped == false) {

			body_cache.addClass("swiped");
			swiped = true;

		};
			
	};

};



$(document).ready(function() {

	album_loader = $("<img/>");
	album_image = $("#viewer-wrapper");
	album_image.loading = album_image.find("#viewer-loading");
	album_list = $("#thumbnails-list");
	album_list.list = album_list.find("ul");
	album_list.items = album_list.find("li");
	album_list.current = album_list.find("li.current");
	album_list.size = album_list.find("li").length;
	album_items = album_list.find("li a");
	navigator_name = $("#navigator #navigator-name");
	navigator_number = $("#navigator #navigator-current");
	map = $("#map");
	map.button = $("#navigator-map");
	map.loaded = false;
	map.opened = false;
	select_previous = $("#navigator-albums").val();

	map.button.bind("click", function(event) {

		if (map.loaded == false) {

			map.loaded = true;

			setTimeout(function() {

				map_load();

			}, 250);

		};

		if (map.opened == false) {

			map.opened = true;
			body_cache.addClass("map");
			map.button.html("Close Map");

		}

		else if (map.opened == true) {

			map.opened = false;
			body_cache.removeClass("map");
			map.button.html("View Map");

		};

	});

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

		if ($(this).val() == select_previous) {

			return false;

		}

		else {

			document.location = location.protocol + '//' + location.host + location.pathname + "?album=" + $(this).val();

		};

	});

	$("#viewer").hammer().bind("swipeleft", function() {

		album_change("arrow", "next");

	}).bind("swiperight", function() {

		album_change("arrow", "prev");

	});

	album_list.list.css("width", album_list.size * 60);

	window_cache.resize(function() {

		if (body_cache.width() <= 900) {

			album_list.list.removeClass("width");

		}

		else {

			album_list.list.addClass("width");

		};

	}).resize();

	album_change(album_list.items.eq(0).find("a"), null, true);

});