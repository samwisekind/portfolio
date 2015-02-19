<?php



	$directory = "http://localhost:8888/flamov-portfolio/";



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