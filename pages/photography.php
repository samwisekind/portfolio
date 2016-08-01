<?php

	$page = "photography";

	require_once "../lib/albums.php";

	$album_list = array();

	foreach ($album as $key => $value) {

		array_push($album_list, $key);

	};

	if (!in_array($_GET["album"], $album_list)) {

		$album_current = "portfolio";

	}

	else if (isset($_GET["album"])) {

		$album_current = $_GET["album"];

	};

	require_once '../lib/header.php';

?>



	<div id="map">

		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyByZ6qLbljzGnzwB2C0qBdJOgVH9x5H1eU"></script>

		<script type="text/javascript">

			function map_load () {

				var location = new google.maps.LatLng(20, 0);

				var mapOptions = {
					center: location,
					zoom: 2,
					scrollwheel: false
				};

				var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

				var places = [
					<?php

						foreach ($album as $key => $value) {

							if ($value[0] == "places") {

								echo "['" . $value[1] . "', " . $value[3][0] . ", " .  $value[3][1] . ", '" .  strtok($_SERVER["REQUEST_URI"], "?") . "?album=" . $key . "'],";

							};

						};

					?>
				];

				for (var i = 0; i < places.length; i++) {

					var marker = new google.maps.Marker({

						position: new google.maps.LatLng(places[i][1], places[i][2]),
						map: map,
						title: places[i][0],
						url: places[i][3],

					});

					google.maps.event.addListener(marker, "click", function() {

						window.location.href = this.url;

					});

   				};

			};

		</script>

		<div id="map-canvas" style="width: 100%; height: 100%;"></div>

	</div>



	<div id="swipe">

		<span id="swipe-span">Swipe left or right<span>, or scroll the thumbnails below</span></span>

	</div>



	<div id="viewer">

		<div class="viewer-arrow left"><a href="#" data-direction="prev"></a></div>
		<div class="viewer-arrow right"><a href="#" data-direction="next"></a></div>

		<div id="viewer-zoom"><a href="#"></a></div>

		<div id="viewer-wrapper">

			<div id="viewer-loading" class="invisible">

				<div></div>

			</div>

		</div>

	</div>



	<div id="thumbnails">

		<div class="thumbnails-arrow top"><a href="#" data-direction="up"></a></div>
		<div class="thumbnails-arrow bottom"><a href="#" data-direction="down"></a></div>

		<div id="thumbnails-list">

			<ul>

				<?php

					for ($i = 0; $i < count($album[$album_current][5]); $i++) {

						if ($i == 0) {

							echo '<li class="current"><a href="#" data-name="' . $album[$album_current][5][$i][0] . '" data-image="' . $album[$album_current][5][$i][2] . '"><img src="' . $directory . 'img/photography/albums/' . $album[$album_current][5][$i][1] . '" alt="" /></a></li>';

						}

						else {

							echo '<li><a href="#" data-name="' . $album[$album_current][5][$i][0] . '" data-image="' . $album[$album_current][5][$i][2] . '"><img src="' . $directory . 'img/photography/albums/' . $album[$album_current][5][$i][1] . '" alt="" /></a></li>';

						};

					};

				?>

			</ul>

		</div>

	</div>



	<div id="navigator">

		<div id="navigator-title">

			<div>

				<h2><?php echo $album[$album_current][1]; ?> <span><?php echo $album[$album_current][2]; ?></span></h2>
				<h3><span id="navigator-name"><?php echo $album[$album_current][5][0][0]; ?></span> <span class="interation-number">(<span id="navigator-current">1</span> of <span><?php echo count($album[$album_current][5]); ?></span>)</span></h3>

			</div>

		</div>

		<div id="navigator-select">

			<div>

				<a id="navigator-map" href="#"><span id="map-open">View Map</span><span id="map-close">Close Map</span></a>

				<select id="navigator-albums">
					<?php

						echo '<option disabled selected>Currently Viewing: ' . $album[$album_current][1] . '</option>';

					?>
					<optgroup label="Collections">
					<?php

						if ($album_current == "portfolio") {

							echo '<option value="portfolio" disabled>' . $album["portfolio"][1] . '</option>';

						}

						else {

							echo '<option value="portfolio">' . $album["portfolio"][1] . '</option>';

						};

					?>
					</optgroup>
					<optgroup label="Places">
						<?php

							foreach ($album as $key => $value) {

								if ($value[0] == "places") {

									if ($key == $album_current) {

										echo '<option value="' . $key . '" disabled>' . $value[1] . '</option>';

									}

									else {

										echo '<option value="' . $key . '">' . $value[1] . '</option>';

									};

								};

							};

						?>
					</optgroup>
					<optgroup label="Things">
						<?php

							foreach ($album as $key => $value) {

								if ($value[0] == "things") {

									if ($key == $album_current) {

										echo '<option value="' . $key . '" disabled>' . $value[1] . '</option>';

									}

									else {

										echo '<option value="' . $key . '">' . $value[1] . '</option>';
									};

								};

							};

						?>
					</optgroup>
				</select>

			</div>

		</div>

	</div>



<?php require_once '../lib/footer.php'; ?>