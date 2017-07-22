@extends ('layouts.project')

@section ('project-content')

	@include('components.projects.project-features', ['items' => [
		'Six-language responsive website',
		'Cross-compatible with IE6 and above',
		'Full-screen video, key-frame, and parallax design features',
		'Custom PHP framework built for collection and watch management'
	]])

	<p>For almost a century Enicar has been at the forefront of timepiece design in Asia. With the move away from Flash-based websites to native and responsive designs, it was time to overhaul Enicar's online presence and bring it into the modern age just in time for its 100th anniversary.</p>

	<p>Originating from Switzerland, Enicar's prominence spans the world. The website had to support up to six languages including English, Cantonese, Mandarin, Japanese, French, and Spanish. This also meant that the website had to support a wide range of browsers, including older browsers such as Internet Explorer 8 which was still prominent with Asian-Pacific audiences (<a href="https://tongji.baidu.com/data/browser" target="_blank" rel="noopener noreferrer">with up to 30% of users in China still using Internet Explorer 8</a> at the time of development). Aspects of the design, such as CSS transitions and parallax scrolling, would have to gracefully degrade or revert to fallbacks for incompatible browsers, while maintaining key aspects of the storytelling-driven design.</p>

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/enicar/enicar-image-1.jpg')
		@slot('caption', 'Most pages featured a full-screen background video, compressed and encoded for desktop and disabled on mobile.')
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/enicar/enicar-image-2.jpg')
		@slot('caption', 'Some pages featured key-frame animated images that would progress/degress depending on the scroll position.')
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/enicar/enicar-image-3.jpg')
		@slot('caption', 'Many navigational features on the site adapated to the device it was being viewed on (desktop on left, mobile on right).')
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/enicar/enicar-image-4.jpg')
		@slot('caption', 'An site-wide header made it easy for users to browse the collections and watches anywhere on the site.')
	@endcomponent

@endsection
