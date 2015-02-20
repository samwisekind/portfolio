<?php

	$page = "index";
	require "lib/header.php";

?>



	<h1>Featured Work</h1>

	<div id="global-list">

		<?php

			$list_array = array(

				array("project", "joyce"),
				array("project", "k11"),
				array("project", "enicar"),
				array("album", "portfolio"),
				array("project", "yungsclub"),
				array("project", "portfolio"),
				array("album", "kenya"),

			);

			for ($i = 0; $i < count($list_array); $i++) {

				$type = $list_array[$i][0];

				if ($type == "project") {

					$image = $project[$list_array[$i][1]][0];
					$title = $project[$list_array[$i][1]][1];
					$subtitle = $project[$list_array[$i][1]][2];
					$link = $directory . "projects/" . $list_array[$i][1] . "/";

					echo '

						<article class="project">

							<div class="image"><a href="' . $link . '"><img src="' . $directory . $image . '" alt="" /></a></div>

							<div class="content">

								<h2><a href="' . $link . '">' . $title . '</a></h2>
								<p>' . $subtitle . '</p>

								<a class="special-link" href="' . $link . '">View Project <span>&#10095;</span></a>

							</div>

							<div class="cf"></div>

						</article>

					';

				}

				else if ($type == "album") {

					$image = $album[$list_array[$i][1]][5][0][2];
					$title = $album[$list_array[$i][1]][1];
					$subtitle = $album[$list_array[$i][1]][2];
					$link = $directory . "album.php?album=" . $list_array[$i][1];

					echo '

						<article class="album">

							<div class="image"><a href="' . $link . '"><img src="' . $directory . $image . '" alt="" /></a></div>

							<div class="content">

								<h2><a href="' . $link . '">' . $title . '</a></h2>
								<p>' . $subtitle . '</p>

								<a class="special-link" href="' . $link . '">View Album <span>&#10095;</span></a>

							</div>

						</article>

					';

				};

			};

		?>

	</div>



	<div class="cf"></div>



<?php require "lib/footer.php"; ?>