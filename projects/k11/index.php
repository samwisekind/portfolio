<?php

	$page = "project";
	$project_name = "k11";
	require "../../lib/header.php";

?>



	<img src="enicar_banner_1.jpg" alt="" class="banner" />

	<section class="section">

		<h4>The Idea</h4>

		<p>To celebrate the launch of the Iron Panda art display at K11 art mall in Hong Kong, an interactive photobooth kiosk was comissioned that would let visitors take photos using a 360 panoramic camera and instantly share it to social media, as well as display it around the mall.</p>

	</section>

	<img src="enicar_banner_1.jpg" alt="" class="banner" />

	<section class="section">

		<h4>Challenges</h4>

		<p>The main challenge was the limination with the camera API. The camera vendor was unable to provide any APIs for us to use, and because of very short time limit for the project (roughly two weeks), we were unable to develop a homebrew solution. The only method of getting the photos off the camera was through an iOS application, which had no auto-uploading features, making the task of creating a seemless and instantaneous photobooth kiosk solution extremely difficult.</p>

		<p>Another challenge was the WiFi network within the art mall. Because of the high capacity of visitors to the art mall, the WiFi network was very slow, and due to the location of the photobooth, we were unable to write ethernet cables to the devices. </p>

	</section>

	<img src="enicar_banner_1.jpg" alt="" class="banner" />

	<div class="section">

		<h4>Result</h4>

		<h5>Retriving the photos</h5>

		<p>First, we developed the method of retrieving the photos from the camera with as least steps as possible. In the iOS application for the camera, there is a share option that can instantly share the photo to social networks. However, it would publish the photo on the camera vendor's website, and post a link to that page on the social network account. To overcome this, we linked the iOS application to a Twitter account and set up a Cron job to check the Twitter account's feed every few seconds using a <code>POST</code> cURL request via the Twitter OAuth API. When a new photo page was shared to the Twitter account by a booth attendant, an off-site PHP script scraped the linked page for the image file. The script would then update a remote JSON file which could be accessed by the iPad apps, website, and displays in order to show their respective content.</p>

		<p>In sum:</p>

		<ol>
			<li>Booth attendant shares photo to Twitter via iOS app once taken</li>
			<li>Cron job checks Twitter feed every few seconds</li>
			<li>On new/unique Twitter post, execute PHP script to scrape page for shared image URL</li>
			<li>Once scraped, append JSON file with image URL and sharing page ID</li>
		</ol>

		<p>We developed this method in order to be able to retrive the photos from the camera with as few steps as possible (the booth attendant only had to share the photo to Twitter, and the rest was automated) and as quicly as possible (the entire proccess took only 10 seconds for each shared photo).</p>

		<h5>iPad App</h5>

		<p>The iPad app was developed using <a href="https://cordova.apache.org/">Cordova</a> as we wanted to make sure we could provide maintanence while off-site. The actual HTML application was hosted remotely, and the iPad would load it through a web-wrapped app. On first launch the iPad would retrive the latest list of photos and their respective URLs from the off-site JSON file. Every few seocnds, the iPad would cross-check its own image list with that on the off-site JSON file, and if a new image had been added, it would update its own list in real-time without distracting the user. Once a user tapped on a photo, the iPad would embed an interactive JavaScript panorama direclty from vendor's website using the sharing page ID stored in the off-site JSON. Users could then share the image via email or produce a QR code (using the <a href="http://davidshimjs.github.io/qrcodejs/">qrcode.js</a> library) that would provide a sharing link for Facebook, Twitter, and Weibo, as well as the project's website.</p>

		<p>Additionally, users could also tap a button to push the currently selected panoramic image to the various TV displays around the art mall in real-time. This worked by sending a <code>GET</code> AJAX request to a computer on-site with the image's URL. Once the on-site computer recived the request, it would download the image onto the harddrive and update a local single-line JSON file with the local filename. Since the network was unstable at times, the on-site computer would use the HTML5 connection api (<code>navigator.onLine</code>) to check if the computer was online before downloading the image, and would only add the image to the JSON if it had downloaded the entire file. This was done in order to prevent the network being slowed down, as the TV displays could load the images through the local area network instead of having to download the images themselves.</p>

		<p>In sum:</p>

		<ol>
			<li>User selects a panoramic image on the iPad app and taps 'Send to Screens'</li>
			<li>iPad app sends an AJAX request to a nearby on-site computer with stored image URL</li>
			<li>On-site computer downloads the image and updates local JSON file</li>
		</ol>

		<p>The iPad app was developed in order to be able to quickly display images shared from the camera iOS app, as well as provide a number of different sharing options for visitors. QR codes were used for easy access, and would automatically launch the Facebook or Twitter apps if the phone OS understood the appropriate request. In addition, the iPad app also provided a single-tap method of pushing any of the images to the multiple displays around the mall.</p>

		<h5>TV Displays</h5>

		<p>Various TV displays, including a 70" TV, were placed around the art mall. In order for them to update in real-time, they would send <code>GET</code> AJAX requests to the on-site computer every few seconds that would cross-check their own JSON file with that on the on-site computer. If the JSON entry were different, the TVs would download the new image from the on-site computer and update their local JSON file. This was done in order so that if a user pushes an image to the TV displays that was shown previously, the TVs would not have re-download the image from the local network as it would already be stored in the local machine.</p>

		<p>The TV displays used a Flash-based panorama that displayed the panaorama in a fish-eyed manner from the camera vendor's sharing website. However, the Flash object returned a cross-domain security error when displaying images not hosted on the website. Therefore, the TV displays ran local servers that used a spoofing proxy to overcome this limitation.</p>

		<p>In sum:</p>

		<ol>
			<li>Send AJAX request to on-site computer</li>
			<li>If currently displayed image is different to the request, check if new image is locally stored</li>
			<li>If new image has already been downloaded before, display new image through the proxy, otherwise download the new image first before display</li>
		</ol>

		<p></p>

		<h5>Conclusion</h5>

		<p>The K11 project was very challenging but very rewarding. I believe we came up with quite an interesting and unique soltuion to overcome the limitations of the camera iOS app and the poor networking conditions. It was enjoyable creating an inter-connected system using AJAX requests and JSON files, as well as joyful seeing people use the apps we developed and pushing their photos to the TV displays around the mall.</p>

	</div>



<?php require "../../lib/footer.php"; ?>