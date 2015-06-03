<?php

	$page = "project";
	$project_name = "enicar";
	require "../../lib/header.php";

?>



	<img src="enicar_banner_1.jpg" alt="" class="banner" />

	<section class="section">

		<h4>The Idea</h4>

		<p>For over 100 years, Enicar has been at the forefront of timepiece design in Asia. In that time, with the birth and growth of the internet, the online presence of companies has become incredibly important. And with the move away from Flash-based websites to more native HTML APIs and responsive designs, it was time to overhaul Enicar's online presence and bring it into the modern age just in time for its 100th anniversary.</p>

		<p>The idea was to create a fully responsive, multilingual, and cross-browser compatible website to show off the beauty of each watch, with large images and text and a story-driven design.</p>

		<h4 class="spacer">Challenges</h4>

		<p>The previous website was made entirely as a Flash application. This meant that almost all mobile devices, including tablets, would be unable to view the website. A full-scale marketing campaign was underway to celebrate Enicar's 100th anniversary, including large posters and displays in the subways in Hong Kong, which meant that passersby would be prone to checking the website on their phones.</p>

		<p>In addition to supporting mobile devices, Enicar's prominence reaches around the world, with its origins in Switzerland. Enicar requested that the website supported up to six languages, including English, Cantonese, Mandarin, Japanese, French, and Spanish. This also meant that the website had to support a wide range of browsers, including older browsers such as Internet Explorer 8 which is still prominent with Asian audiences (<a href="http://tongji.baidu.com/data/browser">with up to 30% of users in China still use Internet Explorer 8</a>). Effects on the site, such as CSS transitions and parallax scrolling, would have to gracefully degrade across browsers where not supported.</p>

		<p>With its broad range of watches, including all of their respective text and image content, the Enicar website overhaul was a massive undertaking.</p>

	</section>

	<img src="enicar_banner_2.jpg" alt="" class="banner" />

	<div class="section">

		<h4>Result</h4>

		<?php project_preview("enicar_preview_1.jpg"); ?>

		<p>The first task was to create a system in order to manage each collection, their watches, and string mapping for all six languages. A simple yet powerful custom PHP backend was developed in order to make managing such a complex site easy, where the client could easily change certain aspects of the site such as language strings or watch images without worrying about breaking the website. This also made it much easier to make sure each page kept its design and underlying code (e.g. SEO) consistent across all the different pages, devices, and languages.</p>

		<?php project_image("enicar_image_1.jpg", "Each watch page features a full-screen background video, compressed and encoded for the desktop and mobile web."); ?>

		<p>The watch pages are made up of different sections, which can be easily customised and changed in the backend. The first section introduces the watch, and features a full-screen video that automatically plays as the page loads. The introduction videos are encoded into a number of different formats in order to support cross-browser compatibility, and are compressed for fast loading on mobile devices and networks. The videos are automatically hidden depending on what device the site is being viewed on, user/browser preferences (such as mobile devices wanting to save bandwidth), or agent strings.</p>

		<?php project_image("enicar_image_2.jpg", "Watch pages feature animated images and text that change depending on the user's scrolling position in order to create dynamic and eye-catching pages."); ?>
		
		<p>Each watch page can be customised with a variety of different sections. Each section features a different design that changes how the images and text are displayed and how the animations (using the <a href="https://github.com/Prinzhorn/skrollr">Skrollr</a> library) and positions of each of the section elements work. In the backend, each section is mapped to a multidimensional array in the language mapping system, so changing different aspects of the section or changing the language mapping strings keeps the section working as intended. This makes sure that the front-end is always consistent and working, making sure the underlying code for each section is consistent.</p>

		<?php project_image("enicar_image_3.jpg", "Many navigational features on the site change depending on what kind of device it is being viewed on. On the left, the watch page section navigation on desktop and tablet browsers. On the right, the navigation changes to be easier to use and view on smaller screens and mobile devices."); ?>

		<p>The watch pages feature a fixed-position section navigation at the bottom of the page. Each thumbnail changes depending on which section the user is currently viewing, determined by their scroll position. This navigation, and all other aspects of the site, change depending on what kind of device the user is viewing the site on. Features such as section navigation change on mobile devices to be easier to view on smaller screens, as well as easier to use (e.g. with a thumb instead of a mouse and keyboard).</p>

		<?php project_image("enicar_image_4.jpg", "An interactive global header makes it easy for users to browse each collection and navigate to the collection's watches anywhere on the site. Each collection also features its own index page."); ?>

		<h5>Cross-Browser Compatibility</h5>

		<p>The main issue with cross-browser compatibility was with the Skrollr library. Although the library had plugins to support Internet Explorer 8, they were not compatible with some of the CSS declarations used with the website. Therefore, the Skrollr library was disabled where needed, namely on mobile devices and older browsers. Since the animations, and therefore the initial starting positions of the elements within each section on the watch pages were defined through the library, a graceful degrade would take place when the library was disabled, as the elements would naturally inherit their default positions through CSS instead.</p>

		<h5>Conclusion</h5>

		<p>The Enicar project was quite a massive undertaking. The high number of watches combined with the multiple languages required for the site resulted in a lot of planning for how the backend was going to be designed. Having been responsible for all aspects of the project, from design to development, I learnt a lot about advanced PHP functions and the challenges in designing a multilingual backend and front-end together. I am quite happy with the design of the watch pages as I feel they create a nice balance between something eye-catching and something easy to digest without being too distracting.</p>

	</div>



<?php require "../../lib/footer.php"; ?>