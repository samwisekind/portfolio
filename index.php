<?php

	$page = "index";
	require "lib/header.php";

?>







	<h1>Featured Work</h1>


	<?php

		$featured_array = array(

			array(
				"work",
				"img/index/featured_work_joyce.jpg",
				"Joyce",
				"Revamping the online identity of Hong Kong's most famous and respected boutique from the ground-up.",
				"Design, Frontend & Backend Development, Responsive, IE8+ Support, Wordpress",
				"project.php"
			),

			array(
				"work",
				"img/index/featured_work_k11.jpg",
				"K11",
				"Creating an inter-connected photobooth solution using a 360° panorama camera.",
				"Frontend & Backend Development, Phonegap/Cordava, REST API",
				"project.php"
			),

			array(
				"work",
				"img/index/featured_work_enicar.jpg",
				"Enicar",
				"Complete website re-design for the 100th anniversary of Asia's prominent and longest-lasting timepiece designers.",
				"Frontend & Backend Development, Responsive, HTML5, PHP",
				"project.php"
			),

			array(
				"photo",
				"img/index/featured_photo_lion.jpg",
				"Masai Mara, Kenya",
				"15th November 2007",
				""
			),

			array(
				"work",
				"img/index/featured_5_image.jpg",
				"Steve Madden",
				"???",
				"???",
				"project.php"
			),

			array(
				"work",
				"img/index/featured_6_image.jpg",
				"Hong Kong Jockey Club",
				"???",
				"???",
				"project.php"
			),

			array(
				"photo",
				"img/index/featured_photo_fox.jpg",
				"London, United Kingdom",
				"19th June 2010",
				""
			)

		);

		index_featured($featured_array);

	?>










	<div class="cf"></div>


<?php require "lib/footer.php"; ?>
