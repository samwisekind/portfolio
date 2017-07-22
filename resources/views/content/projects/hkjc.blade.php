@extends ('layouts.project')

@section ('project-content')

	<p>We were commissioned by the Hong Kong Jockey Club to develop a photo printing booth that would use iPads to print photos in real-time. Users would be able to use the iPads to search for and select photos they had posted on social media. The photo would be sent wirelessly to a printer nearby where it would be printed instantaneously.</p>

	<h3>iPad App</h3>

	<p>We developed the iPad app using <a href="https://cordova.apache.org/" target="_blank" rel="noopener noreferrer">Cordova</a>. The app would send a HTTP <code>GET</code> request to the <a href="http://www.wayin.com" target="_blank" rel="noopener noreferrer">Wayin</a> API service which would return a list of all the social media images of the event posted under a set of hashtags related to the event.</p>

	@component('components.projects.project-image', ['size' => 'small', 'alt' => 'Screenshot of the HKJC app.'])
		@slot('image', '/images/projects/hkjc/hkjc-image-1.jpg')
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/hkjc/hkjc-image-2.jpg')
		@slot('caption')
			Tapping the 'print' button would send a HTTP <code>POST</code> request to the printing server with the image URL and a random printer ID.
		@endslot
	@endcomponent

	<h3>Printing Server</h3>

	<p>The printing server was run on several laptops connected to high-speed photo printers. The server was built using <a href="https://www.angularjs.org/" target="_blank" rel="noopener noreferrer">AngularJS</a> that would listen for HTTP requests respective to its printer ID on the local area network. Requests would be added to a queue which filtered duplicate requests.</p>

	<p>The apps ran in Firefox using the 'kiosk' and 'silent printing' modes, which allowed print requests to be sent to the OS-level printing service without showing any dialogue boxes or notifications. Firefox also allowed for the adjustment of printing parameters such as sizing and spacing, which was cruical to printing on photo-sized paper.</p>

	<p>Printing images was achieved by directly printing a local webpage rendered by AngularJS containing the image next in the queue, and using the native <code>window.print()</code> method. A CSS3 <code>@media print</code> media query ensured the webpage and photo was sized and positioned correctly.</p>

@endsection
