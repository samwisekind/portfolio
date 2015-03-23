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
				array("album", "kenya")

			);

			for ($i = 0; $i < count($work_array); $i++) {

				$type = $work_array[$i][0];
				$link = $featured_array[$i][1];

				if ($type == "project") {

					$name = "Project";
					$image = $project[$work_array[$i][1]][0][0];
					$image_large = $project[$work_array[$i][1]][0][1];
					$title = $project[$work_array[$i][1]][1];
					$subtitle = $project[$work_array[$i][1]][2];
					$responsibilities = $project[$work_array[$i][1]][3];
					$technology = $project[$work_array[$i][1]][4];
					$timeframe = $project[$work_array[$i][1]][5];
					$link = $directory . "projects/" . $work_array[$i][1] . "/";

					$search = strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $title . " " . $subtitle . " " . $responsibilities . " " . $technology));

				}

				else if ($type == "album") {

					$name = "Album";
					$image = $album[$work_array[$i][1]][4][0];
					$image_large = $album[$work_array[$i][1]][4][1];
					$title = $album[$work_array[$i][1]][1];
					$subtitle = $album[$work_array[$i][1]][2];
					$link = $directory . "album.php?album=" . $work_array[$i][1];

					$search = strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $title . " " . $subtitle));


				};

			?>

				<article class="<?php echo $type; ?>" data-search="<?php echo $search; ?>">

					<div class="image"><a href="<?php echo $link; ?>"><img src="<?php echo $directory . $image; ?>" srcset="<?php echo $directory . $image; ?> 1x, <?php echo $directory . $image_large; ?> 2x" alt="<?php echo $name; ?>: <?php echo $title; ?>" /></a></div>

					<div class="content">

						<h2><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h2>
						<a class="special-link" href="<?php echo $link; ?>">View <?php echo $name; ?> <span>&#10095;</span></a>
						<p><?php echo $subtitle; ?></p>

						<?php

							if ($type == "project") {

						?>

							<ul>
								<li><span>Responsibilities:</span> <?php echo $responsibilities; ?></li>
								<li><span>Technology:</span> <?php echo $technology; ?></li>
								<li><span>Timeframe:</span> <?php echo $timeframe; ?></li>
							</ul>

						<?php

							};

						?>

						<div class="cf"></div>

					</div>

				</article>

			<?php

				};

				for ($i = 0; $i < 2; $i++) {

					echo '<article class="spacer">';

				};

			?>

		<div class="cf"></div>

	</div>



<?php require "lib/footer.php"; ?>