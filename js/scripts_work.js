var work_menu, work_items;



function work_filter (target, reset) {

	if (reset == true || target == "all") {

		work_items.items.removeClass("invisible");

	}

	else {

		if (work_menu.field.val() != "") {

			work_menu.field.val("");
			work_items.items.removeClass("invisible");

		};

		work_items.items.addClass("invisible");

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
		work_items.removeClass("search");

	}

	else {

		work_items.addClass("search");

		regex = new RegExp(search, "i");
		
		for (i = 0; i < work_items.items.length; i++) {

			if (work_items.items.eq(i).attr("data-search").search(regex) < 0) {

				work_items.items.eq(i).addClass("invisible");
				
			}

			else {

				work_items.items.eq(i).removeClass("invisible");

			};

		};

	};	

};



$(document).ready(function() {

	work_menu = $("#work-menu");
	work_menu.buttons = work_menu.find("#work-filters li");
	work_menu.field = work_menu.find("#work-search");

	work_items = $("#work-list");
	work_items.items = work_items.find(".work-item");
	work_items.webdesign = work_items.find(".webdesign");
	work_items.photo = work_items.find(".photo");

	work_menu.buttons.bind("click", function(event) {

		event.preventDefault();
		work_filter($(this).attr("data-filter"), false);
		work_menu.buttons.removeClass("current");
		$(this).addClass("current");

	});

	work_menu.field.on("input", work_search);
	
});