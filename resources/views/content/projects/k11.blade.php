@extends ('layouts.project')

@section ('project-content')

	<p>To celebrate the launch of the Iron Panda art display at the K11 art mall in Hong Kong, an interactive photo booth was commissioned that would let visitors take photos of themselves near an art installation using a 360 panoramic camera. Visitors would then be able to view the photos on a website and use an iPad-kiosk to share the photo to social media or display it on a number of TVs inside the mall.</p>

	<p>Due to the short time limit of the project (roughly two weeks), the camera vendor was unable to provide APIs to retrieve photos from the camera. The only method of retrieving the photos was to post to them social media. Coupled with unstable WiFi connectivity inside the mall, we had to develop a creative solution to overcome these limitations while providing a pleasant and seamless experience to visitors.</p>

	<p>Below is a diagram illustrating the final system structure of the K11 project:</p>

	@component('components.projects.project-image', ['size' => 'small', 'alt' => 'Diagram of the system structure.'])
		@slot('image', '/images/projects/k11/k11-image-1.png')
	@endcomponent

	<h3>Off-site server</h3>

	<p>An off-site server was used to retrieve the photos from the on-site camera, and control the photos that were displayed on the website and inside the mall.</p>

	<p>The only way to retrieve photos from the camera was by sharing them to social media (connecting the camera to a device via USB would prevent it from working while connected). On-site, attendants would use the camera vendor's accompanying phone app to share photos to social media after they were taken. Sharing a photo would upload it to the camera vendor's website, automatically posting a link to the webpage with the image embed on the social media account (we had set up a private Twitter account for this, and used Twitter's OAuth endpoints to retrieve the account's protected tweets).</p>

	<p>The server ran a cron job to reguarly check the social media feed (as webhooks were not provided by Twitter at the time). When a new photo was shared, the server ran a PHP script that scraped the shared embed page looking for the image file name. It would then use ID in the file name to construct a URL to the full-resolution image from the vendor's Amazon AWS host. The sever would then update a local JSON file with a URL to and MD5 hash of the full-resolution image file, which both the JSON file and image were served to the on-site server via a HTTP API.</p>

	<h3>On-site server</h3>

	<p>An on-site server was used to serve a JSON file of the full-resolution images for the local area network. The server would also download the full-resolution images from the AWS host server and store them locally, cross-referencing the MD5 hash to ensure the file was not corrupted during download (otherwise it would attempt to download the file again). The server ran on its own 4G wireless connection to overcome the poor WiFi conditions inside the mall, and served the downloaded image files over the local area network to iPad and TVs.</p>

	<h3>iPad App</h3>

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/k11/k11-image-2.jpg')
		@slot('caption', 'Tapping \'Display on TV\' would send the URL of the currently selected photo to the on-site server via a HTTP POST request, which would update the on-site JSON file and \'bounce\' the request to the TVs.')
	@endcomponent

	<p>The iPad kiosk was placed next to the art installation for visitors to use after they had their photo taken. The app used on the iPad was developed using <a href="https://cordova.apache.org/" target="_blank" rel="noopener noreferrer">Cordova</a>, with the webpage being hosted off-site. This allowed us to provide maintenance remotely by updating the webpage without having to reinstall the app on the device.</p>

	<p>The app would read the on-site JSON file on an interval and refresh the photo list when it detected that the last-updated epoch timestamp value in the JSON file had changed (or differed from the one it had stored internally).</p>

	<p>Tapping on a photo would display it in an interactive stereoscopic panorama, where visitors could pan and zoom around the photo. Tapping on 'Get this photo' would provide a list of QR codes that once scanned on a mobile device would prompt the user to share the photo to social media.</p>

	<h3>TV Displays</h3>

	<p>A number of displays placed around the mall, including a 70" TV, would show photos at random from the on-site sever's JSON file. When a visitor would push a photo via the iPad kiosk app, all the TVs in the mall would instantly update to show the requested photo for a period of time, before returning to the random cycle.</p>

	<p>The TVs were connected to Mac Mini's, which were running Chrome in kiosk mode displaying a locally-hosted webpage that used a Flash-based application to show the photos. The application was copied from the vendor's website, however initially it would not run as it would throw cross-domain security policy errors when loading the photos from the local network. We overcame this by running the webpage through a local proxy that would fake the local hostname as being that of the vendor's website. Additionally, modifying parts of the application's ActionScript layer allowed the sphere to automatically rotate.</p>

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/k11/k11-image-3.jpg')
		@slot('caption', 'The interface used for the displays, showing the panoramas in a rotating equirectangular sphere.')
	@endcomponent

	<h3>Website</h3>

	<p>A website was also developed, which allowed users to view photos and share them to Facebook or Weibo.</p>

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/k11/k11-image-4.jpg')
		@slot('caption', 'The photo booth website, with support for IE6 and above.')
	@endcomponent

@endsection
