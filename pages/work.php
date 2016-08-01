<?php

	$page = "work";


	$work_array = array(

		array("project", "joyce"),
		array("project", "enicar"),
		array("album", "portfolio"),
		array("project", "steamchat"),
		array("project", "k11"),
		array("album", "kenya"),
		array("album", "yunnan"),
		array("project", "hkjc"),
		array("project", "phonicshero"),
		array("album", "foxes"),
		//array("project", "yungsclub"),
		array("project", "stevemadden"),
		array("project", "esm"),
		array("album", "vietnam"),
		array("album", "landscapes")

	);

	require_once '../lib/header.php';

	if (isset($_GET["filter"])) {

		if ($_GET["filter"] == "project" || $_GET["filter"] == "album") {

			echo '<script type="text/javascript">work_query = "' . $_GET["filter"] . '";</script>';


		};

	};

?>



	<div id="work-menu">

		<ul id="work-filters">
			<li class="current" data-filter="all"><a href="#">All</a></li>
			<li id="filter-project" data-filter="project"><a href="#">Web Design</a></li>
			<li id="filter-album" data-filter="album"><a href="#">Photography</a></li>
		</ul>

		<input type="text" id="work-search" placeholder="Search projects, keywords, technologies..." />

		<div class="cf"></div>

	</div>



	<div id="global-list">

		<?php

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
					$link = $directory . "album?album=" . $work_array[$i][1];

					if (isset($album[$work_array[$i][1]][2]) == true) {

						$subtitle = $album[$work_array[$i][1]][2];

					}

					else {

						$subtitle = null;

					};

					$search = strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $title));


				};

			?>

				<article class="<?php echo $type; ?>" data-search="<?php echo $search; ?>">

					<div class="image"><a href="<?php echo $link; ?>"><img src="<?php echo $directory . $image; ?>" srcset="<?php echo $directory . $image; ?> 1x, <?php echo $directory . $image_large; ?> 2x" alt="<?php echo $name; ?>: <?php echo $title; ?>" /></a></div>

					<div class="content">

						<h2><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h2>
						<a class="special-link" href="<?php echo $link; ?>">View <?php echo $name; ?> <span>&raquo;</span></a>

						<?php

							if ($subtitle != null) {

								echo '<p>' . $subtitle . '</p>';

							};

						?>

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

			<?php }; ?>

			<div id="spacer"></div>

		<div class="cf"></div>

	</div>



<?php require_once '../lib/footer.php'; ?>