<?php $page = "work"; require "lib/header.php"; ?>



	<div id="intro">

		<h1>K11</h1>
		<h2>Creating an inter-connected photobooth solution using a 360&deg; panorama camera.</h2>

		<ul id="details">
			<li><span>Responsibilities:</span> Systems Architecture, Frontend Development, Backend Development</li>
			<li><span>Timeframe:</span> 21st September 2014 - 21st September 2014</li>
			<li><span>Agency:</span> <a href="http://www.i-cgx.com/">ICGX Asia Limited</a></li>
		</ul>

		<div class="cf"></Div>

	</div>

	<img src="img/work/k11/work_k11_banner_1.jpg" alt="" class="work-banner" />

	<div id="idea" class="section">

		<h3>The Idea</h3>

		<p class="large">K11 is a prestigous museum-retail-art mall in Hong Kong. Host to a variety of interesting art installations, including a giant 50 ft. Panda adorned in iron armor, they wanted to have a photobooth within the mall where members of the public could take photos with a 360&deg; panoramic camera - and then have the option to view and share their photo via iPads within the mall and the official K11 website, as well as push the images to several TVs aroudn the mall in real-time.</p>

		<p>I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image.</p>

	</div>

	<img src="img/work/k11/work_k11_banner_2.jpg" alt="" class="work-banner" />

	<div id="challenges" class="section">

		<h3>Challenges</h3>

		<p class="large">The biggest challenge was that the camera had no public API to work with. The second challenge was trying to reliably transmit massive 5000x5000 high-quality images to various displays and devices in the mall was.</p>

		<p>A large portion of fashion botiques and related companies used full-screen videos and images to highlight their latest and most important story. However, k11 comprises of three distinct but equally important sections: fashion, beauty and art.</p>

		<p>Another important challenge was supporting cross-browser compatibility gracefully. <a href="http://tongji.baidu.com/data/browser">Up to 30% of users in China still use Internet Explorer 8</a>, and considering k11 is Asia's ultimate fashion, beauty and art destination, this was highly important.</p>

	</div>

	<img src="img/work/k11/work_k11_banner_2.jpg" alt="" class="work-banner" />

	<div id="solution" class="section">

		<h3>Solution &amp; Result</h3>

		<p class="large">After</p>

		<p>A large portion of fashion botiques and related companies used full-screen videos and images to highlight their latest and most important story. However, k11 comprises of three distinct but equally important sections: fashion, beauty and art.</p>

		<p>The camera's vendor had a very nifty Flash-based 3D fish-eye panoramic applet that we wanted to use for the TV displays and iPads. Only problem was that did not want to have to re-download the Flash plugin every time the image was changed (there was no method for changing it within the Flash object). The obvious solution was to </p>

		<ol>
			<li>Attendant would take a photo wirelessly using an iPad, then share it to Twitter (which would be selected by default)</li>
			<li>A CRON job would check for any new Tweets every ~5 seconds.</li>
			<li>If the job detected a new (unique) Tweet, a script would download the shared-link's HTML (which was hosted on another site - cross-domain policies!) and search for a HTML node that had the Amazon image hosting service ID within i</li>
			<li>The script would then use the aforementioned ID to construct a URL that would result in the full-resolution version of the image</li>
			<li>This image URL is then appended to a JSON feed, which is what the TV displays, iPads and website used to fetch photobooth data</li>
		</ol>

		<p>Another important challenge was supporting cross-browser compatibility gracefully. <a href="http://tongji.baidu.com/data/browser">Up to 30% of users in China still use Internet Explorer 8</a>, and considering k11 is Asia's ultimate fashion, beauty and art destination, this was highly important.</p>

	</div>






<?php require "lib/footer.php"; ?>