<?php

	$page = "work";
	require "lib/header.php";

?>



	<div id="work-menu">

		<ul id="work-filters">
			<li class="current" data-filter="all"><a href="#">All</a></li>
			<li id="filter-webdesign" data-filter="project"><a href="#">Web Design</a></li>
			<li id="filter-album" data-filter="album"><a href="#">Photography</a></li>
		</ul>

		<input type="text" id="work-search" placeholder="Search projects, keywords, technologies..." />

		<div class="cf"></div>

	</div>



	<div id="global-list">

		<?php

			$work_array = array(

				array("project", "joyce"),
				array("project", "k11"),
				array("project", "enicar"),
				array("album", "portfolio"),
				array("project", "yungsclub"),
				array("project", "portfolio"),
				array("album", "kenya"),

			);

			for ($i = 0; $i < count($work_array); $i++) {

				$type = $work_array[$i][0];
				$link = $featured_array[$i][1];

				if ($type == "project") {

					$image = $project[$work_array[$i][1]][0];
					$title = $project[$work_array[$i][1]][1];
					$subtitle = $project[$work_array[$i][1]][2];
					$responsibilities = $project[$work_array[$i][1]][3];
					$technology = $project[$work_array[$i][1]][4];
					$timeframe = $project[$work_array[$i][1]][5];
					$link = $directory . "projects/" . $work_array[$i][1] . "/";

					$search = strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $title . " " . $subtitle . " " . $responsibilities . " " . $technology));

					echo '

						<article class="project" data-search="' . $search . '">

							<div class="image"><a href="' . $link . '"><img src="' . $image . '" alt="" /></a></div>

							<div class="content">

								<h2><a href="' . $link . '">' . $title . '</a></h2>
								<a class="special-link" href="' . $link . '">View Project <span>&#10095;</span></a>
								<p>' . $subtitle . '</p>

								<ul>
									<li><span>Responsibilities:</span> ' . $responsibilities . '</li>
									<li><span>Technology:</span> ' . $technology . '</li>
									<li><span>Timeframe:</span> ' . $timeframe . '</li>
								</ul>

								<div class="cf"></div>

							</div>

						</article>

					';

				}

				else if ($type == "album") {

					$image = $album[$work_array[$i][1]][5][0][2];
					$title = $album[$work_array[$i][1]][1];
					$subtitle = $album[$work_array[$i][1]][2];
					$link = $directory . "album.php?album=" . $work_array[$i][1];

					$search = strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $title . " " . $subtitle));

					echo '

						<article class="album" data-search="' . $search . '">

							<div class="image"><a href="' . $link . '"><img src="' . $image . '" alt="" /></a></div>

							<div class="content">

								<h2><a href="' . $link . '">' . $title . '</a></h2>
								<a class="special-link" href="' . $link . '">View Album <span>&#10095;</span></a>
								<p>' . $subtitle . '</p>

								<div class="cf"></div>

							</div>

						</article>

					';

				};

			};

			for ($i = 0; $i < 2; $i++) {

				echo '<article class="spacer">';

			};

		?>

		<div class="cf"></div>

	</div>



<?php require "lib/footer.php"; ?>