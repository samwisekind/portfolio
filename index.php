<?php

	$page = "index";
	require "lib/header.php";

?>



	<h1>Featured Work</h1>



	<?php

		$featured_array = array(

			array("project", "joyce"),
			array("project", "k11"),
			array("project", "enicar"),
			array("album", "portfolio"),
			array("project", "yungsclub"),
			array("project", "portfolio"),
			array("album", "kenya"),

		);

		for ($i = 0; $i < count($featured_array); $i++) {

			$type = $featured_array[$i][0];
			$link = $featured_array[$i][1];

			if ($type == "project") {

				$image = $project[$featured_array[$i][1]][0];
				$title = $project[$featured_array[$i][1]][1];
				$subtitle = $project[$featured_array[$i][1]][2];

				echo '

					<article class="project">

						<div class="featured-image"><a href="' . $link . '"><img src="' . $image . '" alt="" /></a></div>

						<div class="featured-content">

							<h2><a href="' . $link . '">' . $title . '</a></h2>
							<h3>' . $subtitle . '</h3>

							<a class="featured-link" href="' . $link . '">View Project <span>&#10095;</span></a>

						</div>

						<div class="cf"></div>

					</article>

				';

			}

			else if ($type == "album") {

				$image = $album[$featured_array[$i][1]][5][0][2];
				$title = $album[$featured_array[$i][1]][1];
				$subtitle = $album[$featured_array[$i][1]][2];

				echo '

					<article class="album">

						<a href="' . strtok($_SERVER["REQUEST_URI"], "?") . "album.php?album=" . $link . '">

							<div class="featured-caption">

								<h2>' . $title. '</h2>
								<h3>' . $subtitle . '</h3>

								<span class="featured-link" href="' . $link . '">View Album <span>&#10095;</span></span>

							</div>

							<img src="' . $image . '" alt="" />

						</a>

					</article>

				';

			};

		};

	?>



	<div class="cf"></div>



<?php require "lib/footer.php"; ?>