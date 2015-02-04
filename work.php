<?php

	$page = "work";

	require "lib/header.php";

?>



	<div id="work-menu">

		<ul id="work-filters">
			<li class="current" data-filter="all"><a href="#">All</a></li>
			<li data-filter="webdesign"><a href="#">Web Design</a></li>
			<li data-filter="photo"><a href="#">Photography</a></li>
		</ul>

		<input type="text" id="work-search" placeholder="Search projects, keywords, technologies..." />

	</div>



	<div id="work-list">

		<?php

			$work_list = array(

				array(
					"work",
					"img/index/featured_work_joyce.jpg",
					"Joyce",
					"Revamping the online identity of Hong Kong's most famous and respected boutique from the ground-up.",
					"Visual &amp System Design, Frontend &amp; Backend Development, UAT",
					"HTML5, CSS3, JavaScript, PHP, Wordpress, MySQL, Photoshop, Illustrator",
					"21st September 2014 - 21st September 2014",
					"project.php"
				),

				array(
					"work",
					"img/index/featured_work_k11.jpg",
					"K11",
					"Creating an inter-connected photobooth solution using a 360° panoramic camera.",
					"Visual &amp Systems Design, Frontend &amp; Backend Development, UAT",
					"HTML5, CSS3, JavaScript, REST API, Instagram API, Graph API, Twitter API, Flash, PHP, Photoshop, Illustrator",
					"21st September 2014 - 21st September 2014",
					"project.php"
				),

				array(
					"work",
					"img/index/featured_work_enicar.jpg",
					"Enicar",
					"Complete website re-design for the 100th anniversary of Asia's prominent and longest-lasting timepiece designers.",
					"Visual &amp; System Design, Frontend & Backend Development, Multilingual Mapping, UAT",
					"HTML5, CSS3, JavaScript, PHP, Photoshop, Illustrator",
					"21st September 2014 - 21st September 2014",
					"project.php"
				),

				array(
					"work",
					"img/index/featured_work_k11.jpg",
					"Yung's Club",
					"Creating an inter-connected photobooth solution using a 360° panoramic camera.",
					"Frontend & Backend Development, PhoneGap/Cordava, REST API",
					"HTML5, CSS3, JavaScript, PHP, Wordpress, MySQL, Photoshop, Illustrator",
					"21st September 2014 - 21st September 2014",
					"project.php"
				),

				array(
					"photo",
					"img/index/featured_photo_lion.jpg",
					"Masai Mara, Kenya",
					"Animals, Nature, Lions",
					"album.php"
				),

				array(
					"photo",
					"img/index/featured_photo_fox.jpg",
					"London, United Kingdom",
					"Animals, Nature, Foxes",
					"album.php"
				)

			);

			work_list($work_list);

		?>

		<div class="cf"></div>

	</div>



<?php require "lib/footer.php"; ?>