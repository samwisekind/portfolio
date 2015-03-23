<?php



	$directory = "http://localhost:8888/flamov-portfolio/";




	function project_preview ($image) {

		echo '

			<div class="project-preview">

				<div class="project-preview-image" style="background-image: url(' . $image . ');"></div>

			</div>

		';

	};



?>