@extends ('layout.project')

@section ('project-content')

	@component("components.project-preview")
		@slot("image", "/img/projects/hkjc/hkjc-preview-1.jpg")
	@endcomponent

	<h3>The Idea</h3>

	<p>We got commissioned to make a photo printing booth that would use iPad apps to print photos from social media in real-time. Users would be able to use the iPads to search for and select photos they had posted on Instagram, Facebook, and Twitter, and then send it wirelessly to a printer nearby where it would be printed instantaneously.</p>

	<h3>Challenges</h3>

	<p>Although the idea was quite straight-forward, the main challenge was getting the iPad apps to send images to the printer and having them print seamlessly. Furthermore, there had to be a queuing system for the printer as multiple iPads would be able to send images to the printer.</p>

	<h3>Result</h3>

	<h4>iPad App</h4>

	@component("components.project-image")
		@slot("image", "/img/projects/hkjc/hkjc-image-1.jpg")
		@slot("caption", "The photo printing booth iPad app. Users can browse through the list of images, search for their username, select the printer under an options menu, and refresh the image list.")
	@endcomponent

	<p>We developed the iPad app using <a href="https://cordova.apache.org/" target="_blank" rel="noopener noreferrer">Cordova</a> as we planned to create the printing service using a local web-based server. The app would send an AJAX <code>GET</code> request to the <a href="http://www.wayin.com" target="_blank" rel="noopener noreferrer">Wayin</a> API service, which would return a JSON of all the social media images of the event. A JavaScript script would then generate a list from the JSON which would be displayed as a grid of thumbnails. Users could tap on any of the thumbnails, which would show a dialogue box displaying the full image and username. Users could then tap a button and the app would send an AJAX <code>POST</code> request to the printing server with the image URL and printer ID in order for the printing server to decide which printer to print it from.</p>

	<p>Users could also search through the images in real-time using simple client-side <code>regex</code> testing to find their image via their username.</p>

	@component("components.project-image")
		@slot("image", "/img/projects/hkjc/hkjc-image-2.jpg")
		@slot("caption", "Tapping a photo will open the printing screen. Tapping the 'Print' button will send the image to the printer.")
	@endcomponent

	<h4>Printing Server</h4>

	<p>We ran the printing server using several laptops connected to high-speed photo printers. The server would run a locally-hosted webpage built with <a href="https://www.angularjs.org/" target="_blank" rel="noopener noreferrer">AngularJS</a> that would listen for AJAX requests via the local area network (of which the iPads were connected to). Once the webpage received a request that corresponded to its respective printer ID, it would add the social media image URL to a queue (which also checked for duplicate requests). Once the printer was idle, the social media image would be displayed on the webpage, and a script would use the <code>window.print()</code> function to send the webpage to the printer. We printed the webpage directly as we used a photo frame image as decoration, and therefore used the <code>@media print</code> CSS media query to make sure the dimensions and positions of the photo frame and social media image were sized and aligned correctly.</p>

	<p>The printing server ran on Firefox using 'kiosk mode', as it provided advanced client features to enable 'silent printing', which would send print requests to the OS-level printing service without showing any dialogue boxes. Furthermore, Firefox also provides configurations for printing parameters such as sizing and spacing, ideal for printing in specific areas on custom paper sizes.</p>

	<h3>Conclusion</h3>

	<p>Overall, the Joyce project was one of my favourites. Being an immense learning experience, it was also a massive undertaking, having been personally responsible for all aspects of design &mdash; including mockups, front-end demos, all CSS and JavaScript development, and UAT &mdash; as well as delving into WordPress and Magento. A lot was learnt about cross-browser compatibility, as having so many different pages with varying layouts and features initially resulted in a lot of interesting problems. Furthermore, it was quite eye-opening being able to work with a variety of different people from the fashion industry, ranging from artists to marketing gurus, and learning how they all view and understand web design, as well as sharing my knowledge and expertise.</p>

@endsection
