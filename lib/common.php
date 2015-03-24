<?php



	//$directory = "http://localhost:8888/flamov-portfolio/";
	$directory = "http://10.0.1.5:8888/flamov-portfolio/";
	//$directory = "http://www.flamov.com/new/";



	function project_preview ($image) {

		echo '

			<div class="project-preview">

				<div class="project-preview-image" style="background-image: url(' . $image . ');"></div>

			</div>

		';

	};



?>