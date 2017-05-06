@extends ('layouts.project')

@section ('project-content')

	<h3>The Idea</h3>

	<p>To celebrate the launch of the Iron Panda art display at K11 art mall in Hong Kong, an interactive photo booth was commissioned that would let visitors take photos using a 360 panoramic camera and instantly share it to social media, as well as display photos on several TV displays around the mall on-demand.</p>

	<h3>Challenges</h3>

	<p>The main challenge was the limitation of the camera API. The camera vendor was unable to provide any APIs for us to use, and because of very short time limit for the project (roughly two weeks), we were unable to develop a home-brew solution. The only method of getting the photos off the camera was through an iOS application, which had no auto-uploading features, making the task of creating a seamless and instantaneous photo booth solution extremely difficult.</p>

	<p>Another challenge was the WiFi network within the art mall. Because of the high capacity of visitors to the art mall, the WiFi network was very slow, and due to the location of the photo booth, we were unable to wire ethernet cables to the devices. Figuring out a way to decrease bandwidth usage was essential to the project.</p>

	<h3>Result</h3>

	@component("components.project-image")
		@slot("image", "/img/projects/k11/k11-image-1.jpg")
		@slot("caption", "The photo booth website.")
	@endcomponent

	<h4>Retrieving the episode</h4>

	<p>First, we developed the method of retrieving the photos from the camera with as few steps as possible. In the iOS application for the camera, there is a share option that can instantly share the photos to social networks. However, it would publish the photo on the camera vendor's website, and post a link to that page on the social network account. To overcome this, we linked the iOS application to a Twitter account and set up a Cron job to check the Twitter account's feed every few seconds using a <code>POST</code> cURL request via the Twitter OAuth API. When a new photo page was shared to the Twitter account by a booth attendant, an off-site PHP script scraped the linked page for the image file name, and would use the file name to retrieve the full-resolution version from Amazon AWS. The script would then update a remote (off-site) JSON file with the image file location, which could be accessed by the iPad apps, website, and displays in order to show their respective content.</p>

	<p>In summary:</p>

	<ol>
		<li>Booth attendant shares photo to Twitter via iOS app once taken</li>
		<li>Cron job checks Twitter feed every few seconds</li>
		<li>On new/unique Twitter post, execute PHP script to scrape page for shared image URL</li>
		<li>Once scraped, find full-resolution version from Amazon AWS</li>
		<li>Append JSON file with full resolution image URL and sharing page ID</li>
	</ol>

	<p>We developed this method in order to be able to retrieve the photos from the camera with as few steps as possible (the booth attendant only had to share the photo to Twitter, and the rest was automated) and as quickly as possible (the entire process took only 10 seconds for each shared photo).</p>

	<h4>iPad App</h4>

	@component("components.project-image")
		@slot("image", "/img/projects/k11/k11-image-2.jpg")
		@slot("caption", "The photo booth iPad app interface.")
	@endcomponent

	<p>The iPad app was developed using <a href="https://cordova.apache.org/" target="_blank" rel="noopener noreferrer">Cordova</a> as we wanted to make sure we could provide maintenance while off-site. The actual HTML application was hosted remotely, and the iPad would load it through a web-wrapped app. On first launch the iPad would retrieve the latest list of photos and their respective URLs from the off-site JSON file mentioned previously. Every few seconds, the iPad would cross-check its own image list with that on the off-site JSON file, and if a new image had been added, it would update and append its own list in real-time without distracting the user. Once a user tapped on a photo, the iPad would embed an interactive JavaScript panorama directly from vendor's website using the sharing page URL stored in the off-site JSON. Users could then share the image via email or produce a QR code (using the <a href="https://davidshimjs.github.io/qrcodejs/" target="_blank" rel="noopener noreferrer">qrcode.js</a> library) that would provide a sharing link for Facebook, Twitter, and Weibo, as well as the project's website.</p>

	<p>Additionally, users could also tap a button to push the currently selected photo to the various TV displays around the art mall in real-time. This worked by sending a <code>GET</code> AJAX request to an on-site computer with the image's URL. Once the on-site computer received the request, it would download the image onto its hard drive and update a local single-line JSON file with the local filename. Since the network was unstable at times, the on-site computer would use the HTML5 connection api (<code>navigator.onLine</code>) to check if the computer was online before downloading the image, and would only add the image to the JSON if it had downloaded the entire file without corruption or an incomplete download. This was done in order to prevent the network being slowed down, as the TV displays could load the images through the local area network instead of having to download the images themselves.</p>

	<p>In summary:</p>

	<ol>
		<li>User selects a panoramic image on the iPad app and taps 'Send to Screens'</li>
		<li>iPad app sends an AJAX request to a nearby on-site computer with stored image URL</li>
		<li>On-site computer downloads the image and updates its local JSON file</li>
	</ol>

	<p>The iPad app was developed in order to be able to quickly display photos shared from the camera iOS app, as well as provide a number of different sharing options for visitors. QR codes were used for easy access, and would automatically launch the Facebook or Twitter apps if the phone OS understood the appropriate request. In addition, the iPad app also provided a single-tap method of pushing any of the images to the displays around the mall.</p>

	<h4>TV Displays</h4>

	@component("components.project-image")
		@slot("image", "/img/projects/k11/k11-image-3.jpg")
		@slot("caption", "The interface used on an 80-inch TV display.")
	@endcomponent

	<p>Various TV displays, including a 70" TV, were placed around the art mall. In order for them to update in real-time, they would send <code>GET</code> AJAX requests to the on-site computer every few seconds that would cross-check their own JSON file with that on the on-site computer. If the JSON files were different, the TVs would update its own file as well as download the new image file through the local area network. This was done in order so that if a user pushes an image to the TV displays that was already shown previously, the TVs would not have re-download the image from the local network as it would already be stored in the local machine.</p>

	<p>The TV displays used a automated Flash-based panoramic display that showed the photos in a fisheye style from the camera vendor's sharing website. However, the Flash object returned a cross-domain security error when displaying images not hosted on the website. Therefore, the TV displays ran local servers that used a spoofing proxy to overcome this limitation.</p>

	<p>In summary:</p>

	<ol>
		<li>Send AJAX request to on-site computer</li>
		<li>If currently displayed image is different to the request, check if new image is locally stored</li>
		<li>If new image has already been downloaded before, display new image through the proxy, otherwise download the new image first before displaying</li>
	</ol>

	<h3>Conclusion</h3>

	<p>The K11 project was very challenging but very rewarding. I believe we came up with quite an interesting and unique solution to overcome the limitations of the camera iOS app and the unstable networking conditions. It was enjoyable creating an inter-connected system using AJAX requests and JSON files, as well as seeing people use the apps we developed and pushing their photos to the TV displays around the mall.</p>

@endsection
