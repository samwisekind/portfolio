<?php



	$directory = "http://localhost:8888/flamov-portfolio/";




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