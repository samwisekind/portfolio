<?php

	$page = "project";

	$project_title = "Joyce";
	$project_subtitle = "Revamping the online identity of Hong Kong's most famous and respected boutique from the ground-up.";

	require "lib/header.php";

?>



	<div id="intro">

		<h2><?php echo $project_title; ?></h2>
		<h3><?php echo $project_subtitle; ?></h3>

		<ul id="details">
			<li><span>Responsibilities:</span> Design, Frontend &amp; Backend Development, Wordpress Implimentation</li>
			<li><span>Technology:</span> HTML5, CSS3, JavaScript, PHP, Wordpress, MySQL, Photoshop, Illustrator</li>
			<li><span>Timeframe:</span> 21st September 2014 - 21st September 2014</li>
		</ul>

		<div class="cf"></Div>

	</div>

	<img src="img/project/joyce/project_joyce_banner_1.jpg" alt="" class="project-banner" />

	<div id="idea" class="section">

		<h4>The Idea</h4>

		<p class="large">Joyce is one of Hong Kong's most famous and respected botiques, and they needed a new online identity. The task was to redesign their website from the ground-up for the modern internet, with full responsive and cross-browser compatibility, driven by a powerful backend.</p>

		<p>I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image.</p>

		<?php

			$project_preview = array(

				"img/project/joyce/project_joyce_preview_1_large.jpg",
				"img/project/joyce/project_joyce_preview_1_medium.jpg",
				"img/project/joyce/project_joyce_preview_1_small.jpg",


			);

			project_preview($project_preview);

		?>

		<p>I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image.</p>

	</div>

	<img src="img/project/joyce/project_joyce_banner_2.jpg" alt="" class="project-banner" />

	<div id="challenges" class="section">

		<h4>Challenges</h4>

		<p class="large">Joyce comprises of three distinct but equally important sections: fashion, beauty and art. How do you create an engaging and interesting website that gives each of these sections their own spotlight without taking presidence other one another?</p>

		<p>A large portion of fashion botiques and related companies used full-screen videos and images to highlight their latest and most important story. However, Joyce comprises of three distinct but equally important sections: fashion, beauty and art.</p>

		<p>Another important challenge was supporting cross-browser compatibility gracefully. <a href="http://tongji.baidu.com/data/browser">Up to 30% of users in China still use Internet Explorer 8</a>, and considering Joyce is Asia's ultimate fashion, beauty and art destination, this was highly important.</p>

	</div>

	<img src="img/project/joyce/project_joyce_banner_3.jpg" alt="" class="project-banner" />

	<div id="solution" class="section">

		<h4>Solution &amp; Result</h4>

		<p class="large">After</p>

		<p>A large portion of fashion botiques and related companies used full-screen videos and images to highlight their latest and most important story. However, Joyce comprises of three distinct but equally important sections: fashion, beauty and art.</p>

		<p>Another important challenge was supporting cross-browser compatibility gracefully. <a href="http://tongji.baidu.com/data/browser">Up to 30% of users in China still use Internet Explorer 8</a>, and considering Joyce is Asia's ultimate fashion, beauty and art destination, this was highly important.</p>

	</div>






<?php require "lib/footer.php"; ?>