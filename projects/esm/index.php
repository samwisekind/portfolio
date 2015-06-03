<?php

	$page = "project";
	$project_name = "esm";
	require "../../lib/header.php";

?>



	<img src="esm_banner_1.jpg" alt="" class="banner" />

	<section class="section">

		<h4>The Idea</h4>

		<p>ESM (eSports Stockmarket) was a proof of concept for a real-time betting platform built around eSports. I was commissioned to create some concepts for what the platform would look like and how it would operate.</p>

		<h4 class="spacer">Result</h4>

		<?php project_image("esm_image_1.jpg", ""); ?>

		<p>The home page shows featured matches where users can click on any of the matches and instantly launch the betting interface. Additionally, carousels for featured store items and events were also featured.</p>

		<?php project_image("esm_image_2.jpg", ""); ?>
		
		<p>Users could browse through and filter matches, and view their odds, activity, and time until they started. Clicking on a match allows the user to select between using real money or play money (which could not be exchanged for real world money and was purely for entertainment).</p>

		<?php project_image("esm_image_3.jpg", ""); ?>

		<p>The betting interface allows users to select from one of three types of betting ('Static' being a straight-up bet, 'Wildcard' being based on some events during the game, and 'Dynamic' being live betting). The interface also included a live stream of the game, and the lower-right section was to include a real-time graph showing the odds between the two teams.</p>

		<?php project_image("esm_image_4.jpg", ""); ?>

		<p>The site also featured a store where users could rank up their profile based on their activity on the site. A higher rank would result in more of a return on bets, as well as access to exclusive items on the store. Users could also rank up virtual points to spend on the store.</p>

	</div>



<?php require "../../lib/footer.php"; ?>