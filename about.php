<?php

	$page = "about";
	require "lib/header.php";

?>



	<h1>About &amp; Contact</h1>

	<p>My name is Sam and I am a designer, web developer and photographer. I like to develop creative and elegant solutions to complex problems, with a constant focus on the psychology of end-users.</p>

	<p>My main areas of expertise are in HTML5, CSS3, JavaScript, jQuery, GreenSock, Cordova/PhoneGap, PHP and WordPress. I have worked with numerous clients in Hong Kong and around the world, developing a variety of digital solutions including modern responsive websites, ad-hoc mobile applications, and interactive digital displays. You can <a href="<?php echo $directory; ?>work.php?filter=project">view some of those projects here</a>.</p>

	<ul id="about-logos">
		<li id="about-logos-html5"><a href="http://www.w3.org/TR/html5/"><span>HTML5</span></a></li>
		<li id="about-logos-css3"><a href="http://www.w3.org/Style/CSS/current-work.en.html"><span>CSS3</span></a></li>
		<li id="about-logos-js"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><span>JavaScript</span></a></li>
		<li id="about-logos-jquery"><a href="https://www.jquery.com/"><span>jQuery</span></a></li>
		<li id="about-logos-greensock"><a href="https://www.greensock.com/"><span>GreenSock</span></a></li>
		<li id="about-logos-cordova"><a href="https://cordova.apache.org/"><span>Cordova</span></a></li>
		<li id="about-logos-php"><a href="http://www.php.net/"><span>PHP</span></a></li>
		<li id="about-logos-wordpress"><a href="https://www.wordpress.org/"><span>WordPress</span></a></li>
	</ul>

	<div class="cf"></div>

	<p>I am also an active wildlife and nature photographer. You can <a href="<?php echo $directory; ?>album.php">view my photography portfolio here</a> along with <a href="<?php echo $directory; ?>work.php?filter=album">other albums</a>.</p>

	<p>I am currently working freelance so if you would like contact me with any prospective projects or find out more about me or my work, please feel free to email me at <a href="mailto:sam@flamov.com">sam@flamov.com</a> or use the contact form below:</p>



	<form id="contact-form">

		<ul id="contact-list" data-parsley-validate>

			<li class="contact-item contact-entry">
				<label for="contact-name">
					<span>Name</span>
					<input type="text" id="contact-name" placeholder="Name" class="contact-field contact-required" data-parsley-required="true" />
					<div class="cf"></div>
				</label>
			</li>

			<li class="contact-item contact-entry">
				<label for="contact-email">
					<span>Email</span>
					<input type="email" id="contact-email" placeholder="Email" class="contact-field contact-required" data-parsley-required="true" data-parsley-type="email" />
					<div class="cf"></div>
				</label>
			</li>

			<li class="contact-item contact-entry">
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