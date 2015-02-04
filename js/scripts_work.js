var work_menu, work_search, work_items;



function work_filter (target, reset) {

	if (reset == true || target == "all") {

		work_items.removeClass("invisible");

	}

	else {

		if (work_menu.field.val() != "") {

			work_search.val("");
			work_items.removeClass("invisible");

		};

		work_items.addClass("invisible");

		if (target == "webdesign") {

			work_items.webdesign.removeClass("invisible");

		}

		else if (target == "photo") {

			work_items.photo.removeClass("invisible");

		}
	
	};

};



function work_search () {

	search = work_menu.field.val();

	work_menu.buttons.removeClass("current");
	work_menu.buttons.eq(0).addClass("current");


	if (search == "") {

		work_filter(null, true);

	}

	else {

		regex = new RegExp(search, "i");
		
		for (i = 0; i < work_items.length; i++) {

			if (work_items.eq(i).attr("data-search").search(regex) < 0) {

				work_items.eq(i).addClass("invisible");
				
			}

			else {

				work_items.eq(i).removeClass("invisible");

			};

		};

	};	

};



$(document).ready(function() {

	work_menu = $("#work-menu");
	work_menu.buttons = work_menu.find("#work-filters li");
	work_menu.field = work_menu.find("#work-search");

	work_items = $("#work-list .work-item");
	work_items.webdesign = $("#work-list .webdesign");
	work_items.photo = $("#work-list .photo");

	work_menu.buttons.bind("click", function(event) {

		event.preventDefault();
		work_filter($(this).attr("data-filter"), false);
		work_menu.buttons.removeClass("current");
		$(this).addClass("current");

	});

	work_menu.field.on("input", work_search);
	
});