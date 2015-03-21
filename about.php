<?php

	$page = "about";
	require "lib/header.php";

?>



	<h1>About &amp; Contact</h1>

	<p>My name is Sam and I am a designer, web developer and photographer.</p>

	<p>My main areas of expertise are in HTML5, CSS3, JavaScript, jQuery, GreenSock, Cordova/PhoneGap, PHP and WordPress. I also have experience in SQL and ASP, and am an active wildlife and nature photographer. I like to develop creative and elegant solutions to complex problems, with a constant focus on the psychology of end-users.</p>

	<p>I have worked with numerous clients in Hong Kong and around the world, developing a variety of digital solutions ranging from modern responsive websites to ad-hoc mobile applications. You can view some of these projects and my photography albums <a href="<?php echo $directory; ?>work.php">here</a>.</p>

	<p>I currently work freelance so if you would like contact me with any prospective projects or find out more about me or my work, you can email me at <a href="mailto:sam@flamov.com">sam@flamov.com</a> or use the contact form below:</p>



	<form id="contact-form">

		<ul id="contact-list" data-parsley-validate>

			<li class="contact-item">
				<label for="contact-name">
					<span>Name</span>
					<input type="text" id="contact-name" placeholder="Name" class="contact-field contact-required" data-parsley-required="true" />
					<div class="cf"></div>
				</label>
			</li>

			<li class="contact-item">
				<label for="contact-email">
					<span>Email</span>
					<input type="email" id="contact-email" placeholder="Email" class="contact-field contact-required" data-parsley-required="true" data-parsley-type="email" />
					<div class="cf"></div>
				</label>
			</li>

			<li class="contact-item">
				<label for="contact-message">
					<span>Message</span>
					<textarea id="contact-message" placeholder="Your message..." class="contact-field contact-required" data-parsley-required="true"></textarea>
					<div class="cf"></div>
				</label>
			</li>
	
			<li id="contact-buttons" class="contact-item">
				<div id="contact-sending"><span>Sending...</span></div>
				<input type="reset" value="Reset" id="contact-reset" class="contact-button">
				<input type="submit" value="Submit" id="contact-submit" class="contact-button">
				<div class="cf"></div>
			</li>

		</ul>

	</form>



<?php require "lib/footer.php"; ?>