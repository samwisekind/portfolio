<?php

	$page = "project";
	$project_name = "phonicshero";
	require "../../lib/header.php";

?>



	<img src="phonicshero_banner_1.jpg" alt="" class="banner" />

	<section class="section">

		<h4>The Idea</h4>

		<p>Phonics Hero is an iPad app that contains games that help with synthetic phonics.</p>

		<h4 class="spacer">Result</h4>

		<p>The games were made using the HTML5 <code>canvas</code> API. We used <a href="https://www.greensock.com/tweenmax">TweenMax</a> for the animations and <a href="http://www.createjs.com/">CreateJS</a> for audio and touch events, wrapped in a mobile app using <a href="https://cordova.apache.org/"> Cordova</a>.</p>

		<?php project_image("phonicshero_image_1.jpg", "In this game, the narrator would call out the letter sound that needs to be tapped. When the correct letter had been tapped five times, it would move onto the next letter."); ?>

	</div>



<?php require "../../lib/footer.php"; ?>