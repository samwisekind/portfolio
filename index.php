<?php

	$page = "index";
	require "lib/header.php";

?>



	<h1><span>Featured Work</span> <a href="work.php" class="title-link">View all work <span>&raquo;</span></a></h1>

	<div id="global-list">

		<?php

			$list_array = array(

				array("project", "joyce"),
				array("project", "enicar"),
				array("album", "portfolio"),
				array("project", "steamchat"),
				array("project", "k11"),
				array("album", "kenya")

			);

			for ($i = 0; $i < count($list_array); $i++) {

				$type = $list_array[$i][0];

				if ($type == "project") {

					$name = "Project";
					$image = $project[$list_array[$i][1]][0][0];
					$image_large = $project[$list_array[$i][1]][0][1];
					$title = $project[$list_array[$i][1]][1];
					$subtitle = $project[$list_array[$i][1]][2];
					$link = $directory . "projects/" . $list_array[$i][1] . "/";

				}

				else if ($type == "album") {

					$name = "Album";
					$image = $album[$list_array[$i][1]][4][0];
					$image_large = $album[$list_array[$i][1]][4][1];
					$title = $album[$list_array[$i][1]][1];

					if (isset($album[$list_array[$i][1]][2]) == true) {

						$subtitle = $album[$list_array[$i][1]][2];

					}

					else {

						$subtitle = null;

					};

					$link = $directory . "album?album=" . $list_array[$i][1];

				};

		?>

			<article class="<?php echo $type; ?>">

				<div class="image"><a href="<?php echo $link; ?>"><img src="<?php echo $directory . $image; ?>" srcset="<?php echo $directory . $image; ?> 1x, <?php echo $directory . $image_large; ?> 2x" alt="<?php echo $name; ?>: <?php echo $title; ?>" /></a></div>

				<div class="content">

					<h2><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h2>
					
					<?php

						if ($subtitle != null) {

							echo '<p>' . $subtitle . '</p>';

						};

					?>

					<a class="special-link" href="<?php echo $link; ?>">View <?php echo $name; ?> <span>&raquo;</span></a>

				</div>

				<div class="cf"></div>

			</article>

		<?php

			};

		?>

	</div>

	<div class="cf"></div>



<?php require "lib/footer.php"; ?>