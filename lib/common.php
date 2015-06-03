<?php



	//$directory = "http://localhost:8888/flamov-portfolio/";
	$directory = "http://10.0.1.5:8888/flamov-portfolio/";
	//$directory = "http://www.flamov.com/";



	function project_preview ($image) {

		echo '

			<div class="project-preview">

				<div class="project-preview-image" style="background-image: url(' . $image . ');"></div>

			</div>

		';

	};


	function project_image ($image, $caption) {

		echo '

			<figure class="project-image">

				<img src="' . $image . '" alt="' . $caption . '" />';

				if ($caption != "") {

					echo '<figcaption class="project-image-caption">' . $caption . '</figcaption>';

				};

			echo '</figure> ';

	};



	function project_video ($video, $caption) {

		echo '

			<figure class="project-video">

				<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/' . $video . '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

				<figcaption class="project-video-caption">' . $caption . '</figcaption>

			</figure>

		';

	};



?>