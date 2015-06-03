<?php

	$page = "project";
	$project_name = "hkjc";
	require "../../lib/header.php";

?>



	<img src="hkjc_banner_1.jpg" alt="" class="banner" />

	<section class="section">

		<h4>The Idea</h4>

		<p>We got commissioned to make a photo printing booth that would use iPad apps to print photos from social media in real-time. Users would be able to use the iPads to search for and select photos they had posted on Instagram, Facebook, and Twitter, and then send it wirelessly to a printer nearby where it would be printed instantaneously.</p>

		<h4 class="spacer">Challenges</h4>

		<p>Although the idea was quite straight-forward, the main challenge was getting the iPad apps to send images to the printer and having them print seamlessly. Furthermore, there had to be a queuing system for the printer as multiple iPads would be able to send images to the printer.</p>

		<h4 class="spacer">Result</h4>

		<h5>iPad App</h5>

		<?php project_image("hkjc_image_1.jpg", "The photo printing booth iPad app. Users can browse through the list of images, search for their username, select the printer under an options menu, and refresh the image list."); ?>

		<p>We developed the iPad app using <a href="https://cordova.apache.org/">Cordova</a> as we planned to create the printing service using a local web-based server. The app would send an AJAX <code>GET</code> request to the <a href="http://www.wayin.com">Wayin</a> API service, which would return a JSON of all the social media images of the event. A JavaScript script would then generate a list from the JSON which would be displayed as a grid of thumbnails. Users could tap on any of the thumbnails, which would show a dialogue box displaying the full image and username. Users could then tap a button and the app would send an AJAX <code>POST</code> request to the printing server with the image URL and printer ID in order for the printing server to decide which printer to print it from.</p>

		<p>Users could also search through the images in real-time using simple client-side <code>regex</code> testing to find their image via their username.</p>

		<?php project_image("hkjc_image_2.jpg", "Tapping a photo will open the printing screen. Tapping the 'Print' button will send the image to the printer."); ?>

		<h5>Printing Server</h5>

		<p>We ran the printing server using several laptops connected to high-speed photo printers. The server would run a locally-hosted webpage built with <a href="https://www.angularjs.org/">AngularJS</a> that would listen for AJAX requests via the local area network (of which the iPads were connected to). Once the webpage received a request that corresponded to its respective printer ID, it would add the social media image URL to a queue (which also checked for duplicate requests). Once the printer was idle, the social media image would be displayed on the webpage, and a script would use the <code>window.print()</code> function to send the webpage to the printer. We printed the webpage directly as we used a photo frame image as decoration, and therefore used the <code>@media print</code> CSS media query to make sure the dimensions and positions of the photo frame and social media image were sized and aligned correctly.</p>

		<p>The printing server ran on Firefox using 'kiosk mode', as it provided advanced client features to enable 'silent printing', which would send print requests to the OS-level printing service without showing any dialogue boxes. Furthermore, Firefox also provides configurations for printing parameters such as sizing and spacing, ideal for printing in specific areas on custom paper sizes.</p>

		<h5>Conclusion</h5>

		<p>The photo printing booth project was very fun to make. The concept and execution were straightforward, the the resulting product worked flawlessly. Furthermore, it is good proof that it is easy to make seemingly complicated real-world applications and services using a simple web application without having to invest in customised hardware or applications.</p>

	</div>



<?php require "../../lib/footer.php"; ?>