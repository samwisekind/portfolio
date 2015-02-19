<?php



	if ($page == "album") {

		require_once "lib/albums.php";

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

	};



	function work_list ($array) {

		for ($i = 0; $i < count($array); $i++) {

			$type = $array[$i][0];
			$image = $array[$i][1];
			$title = $array[$i][2];
			$subtitle = $array[$i][3];

			if ($type == "work") {

				$responsibilities = $array[$i][4];
				$technology = $array[$i][5];
				$timeframe = $array[$i][6];

				$search = strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $title . " " . $subtitle . " " . $responsibilities . " " . $technology));

				$link = $array[$i][7];

				echo '

					<article class="work-item webdesign" data-search="' . $search . '">

						<div class="image"><a href="' . $link . '"><img src="' . $image . '" alt="" /></a></div>

						<div class="details">

							<h2><a href="' . $link . '">' . $title . '</a></h2>
							<a class="special-link" href="' . $link . '">View Project <span>&#10095;</span></a>
							<h3>' . $subtitle . '</h3>

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

				$search = strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $title . " " . $subtitle));

				$link = $array[$i][4];

				echo '

					<article class="work-item album" data-search="' . $search . '">

						<div class="image"><a href="' . $link . '"><img src="' . $image . '" alt="" /></a></div>

						<div class="details">

							<h2><a href="' . $link . '">' . $title . '</a></h2>
							<a class="special-link" href="' . $link . '">View Album <span>&#10095;</span></a>
							<h3>' . $subtitle . '</h3>

							<div class="cf"></div>

						</div>

					</article>

				';

			};

		};

	};



	function project_preview ($array) {

		echo '

			<div class="project-preview">

				<img src="' . $array[0] . '" class="project-preview-large" alt="" />
				<img src="' . $array[1] . '" class="project-preview-medium" alt="" />
				<img src="' . $array[2] . '" class="project-preview-small" alt="" />

			</div>

		';

	};



?>