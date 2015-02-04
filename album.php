<?php

	$page = "album";

	require "lib/header.php";

?>



<?php

	// Album Name/Location
	// Timeframe/Date
	// Geolocation: Longitude
	// Geolocation: Latitude
	// Array with the images: thumbnail then fullsize


	$album["kenya"] = array(

		"Kenya, South Africa",
		"12th September 2014 - 12th September 2014",
		"1.581981",
		"35.2451",

		array(
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_lion.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_fox.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_lion.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_fox.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_lion.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_fox.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_lion.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_fox.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_lion.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_fox.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_lion.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_fox.jpg"],
			["blah blah blah", "img/index/featured_photo_lion.jpg", "img/index/featured_photo_lion.jpg"]
		)

	);

	$album["test"] = array(

		"test",
		"test",
		"0",
		"0",

		array(
			"img/index/featured_photo_lion.jpg",
			"img/index/featured_photo_lion.jpg"
		)

	);





	if (isset($_GET["album"])) {

    	$target = $album[$_GET["album"]];

	}

	else {

		$target = $album["kenya"];

	};





	//print_r($album);





?>









	<div id="viewer">

		<div class="viewer-arrow left"><a href="#" data-direction="prev"></a></div>
		<div class="viewer-arrow right"><a href="#" data-direction="next"></a></div>
		
		<div id="viewer-wrapper"></div>

	</div>




	<div id="thumbnails">

		<div class="thumbnails-arrow top"><a href="#" data-direction="up"></a></div>
		<div class="thumbnails-arrow bottom"><a href="#" data-direction="down"></a></div>

		<div id="thumbnails-list">

			<ul>

				<?php

					for ($i = 0; $i < count($target[4]); $i++) {

						if ($i == 0) {

							echo '<li class="current"><a href="#" data-name="' . $target[4][$i][0] . '" data-image="' . $target[4][$i][2] . '"><img src="' . $target[4][$i][1] . '" alt="" /></a></li>';

						}

						else {

							echo '<li><a href="#" data-name="' . $target[4][$i][0] . '" data-image="' . $target[4][$i][2] . '"><img src="' . $target[4][$i][1] . '" alt="" /></a></li>';

						};

					};

				?>

			</ul>

		</div>

	</div>



	<div id="navigator">
			
		<div id="navigator-title">

			<div>

				<h2><?php echo $target[0]; ?></h2>
				<h3><?php echo $target[1]; ?></h3>

			</div>

		</div>

		<div id="navigator-interation">

			<div>

				<span><span id="navigator-current">1</span> of <span><?php echo count($target[4]); ?></span></span>

			</div>

		</div>

		<div id="navigator-select">

			<div>
				
				<a id="navigator-map" href="#">View Map</a>

				<select>
					<optgroup label="Places">
						<option value="">Kenya, South Africa</option>
						<option value="">London, United Kingdom</option>
					</optgroup>
					<optgroup label="Animals">
						<option value="">Foxes</option>
						<option value="">Lions</option>
					</optgroup>
				</select>

			</div>

		</div>

	</div>















<?php require "lib/footer.php"; ?>