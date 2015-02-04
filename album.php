<?php

	$page = "album";

	require "lib/header.php";

?>




	<div id="viewer">

		<div class="viewer-arrow left"><a href="#" data-direction="prev"></a></div>
		<div class="viewer-arrow right"><a href="#" data-direction="next"></a></div>
		
		<div id="viewer-wrapper" style="background-image: url('<?php echo $album[$album_current][5][0][2]; ?>');"></div>

	</div>




	<div id="thumbnails">

		<div class="thumbnails-arrow top"><a href="#" data-direction="up"></a></div>
		<div class="thumbnails-arrow bottom"><a href="#" data-direction="down"></a></div>

		<div id="thumbnails-list">

			<ul>

				<?php

					for ($i = 0; $i < count($target[5]); $i++) {

						if ($i == 0) {

							echo '<li class="current"><a href="#" data-name="' . $target[5][$i][0] . '" data-image="' . $target[5][$i][2] . '"><img src="' . $target[5][$i][1] . '" alt="" /></a></li>';

						}

						else {

							echo '<li><a href="#" data-name="' . $target[5][$i][0] . '" data-image="' . $target[5][$i][2] . '"><img src="' . $target[5][$i][1] . '" alt="" /></a></li>';

						};

					};

				?>

			</ul>

		</div>

	</div>



	<div id="navigator">
			
		<div id="navigator-title">

			<div>

				<h2><?php echo $target[1]; ?></h2>
				<h3><?php echo $target[2]; ?></h3>

			</div>

		</div>

		<div id="navigator-interation">

			<div>

				<span id="navigator-name"><?php echo $target[5][0][0]; ?></span>
				<span class="interation-number">(<span id="navigator-current">1</span> of <span><?php echo count($target[5]); ?></span>)</span>

			</div>

		</div>

		<div id="navigator-select">

			<div>
				
				<a id="navigator-map" href="#">View Map</a>

				<select id="navigator-albums">
					<option value="" disabled selected><?php echo "Viewing: " . $album[$album_current][1]; ?></option>
					<option disabled></option>
					<option value="portfolio"><?php echo $album["portfolio"][1]; ?></option>
					<option disabled></option>
					<optgroup label="Places">
						<?php

							foreach ($album as $key => $value) {

								if ($value[0] == "places") {

									echo '<option value="' . $key . '">' . $value[1] . '</option>';

								};

							};

						?>
					</optgroup>
					<optgroup label="Things">
						<?php

							foreach ($album as $key => $value) {

								if ($value[0] == "things") {

									echo '<option value="' . $key . '">' . $value[1] . '</option>';

								};

							};

						?>
					</optgroup>
				</select>

			</div>

		</div>

	</div>



<?php require "lib/footer.php"; ?>