@extends ('layouts.project')

@section ('project-content')

	@include('components.projects.project-highlights', ['items' => [
		'Multi-language responsive website',
		'Cross-compatible with IE6 and above',
		'Custom WordPress plugin for grid design',
		'Relational and inter-connected stores and brands directory'
	]])

	<p>Joyce is one of Hong Kong's most famous and respected luxury retailers, and they needed a new online identity. The task was to redesign their website from the ground-up for the modern internet.</p>

	<p>Although Joyce's influence spans the world, its roots come from Hong Kong. At the time of development, <a href="https://tongji.baidu.com/data/browser" target="_blank" rel="noopener noreferrer">up to 30% of users in China still used Internet Explorer 8</a>. Ensuring solid cross-browser support while maintaining a pixel-perfect design appropriate for such a prestigious brand was a fundamental and challenging goal of the project.</p>

	@component('components.projects.project-image', ['size' => 'large', 'alt' => 'TBA'])
		@slot('image', '/images/projects/joyce/joyce-image-1.jpg')
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/joyce/joyce-image-1.jpg')
		@slot('caption', 'A custom WordPress plugin was developed which allowed for images to be uploaded and placed in a single grid cell or across multiple cells. Hyperlinks could also be defined per-cell or across several at once.')
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/joyce/joyce-image-2.jpg')
		@slot('caption', 'Videos on the website use the HTML5 video API, with a lightweight Flash video player fallback.')
	@endcomponent

	@component('components.projects.project-caption')
		@slot('video', '/videos/projects/joyce/joyce-video-1')
		@slot('image', '/images/projects/joyce/joyce-image-3.jpg')
		@slot('caption', 'Stores and brands are relationally-connected and featured throughout the website, listing what brands are stocked in which stores.')
	@endcomponent

	@component('components.projects.project-caption')
		@slot('image', '/images/projects/joyce/joyce-image-4.jpg')
		@slot('caption', 'The stores directory contains information such as opening times, contact numbers, and store address.')
	@endcomponent

	<h3>e-Shop development</h3>

	<p>Several mockups and proof-of-concepts were designed and developed for a second phase of development. The aim was to implement an e-commmerce platform with Magento and integrate various features across the site.</p>

	<p>Features included a site-wide shopping basket, real-time tracking of online and physical store stock and inventory, membership and loyalty program management, native iOS and Android store-app development, and more.</p>

	@component('components.projects.project-image', ['size' => 'small', 'alt' => 'TBA'])
		@slot('image', '/images/projects/joyce/joyce-image-5.jpg')
	@endcomponent

	@component('components.projects.project-image', ['size' => 'small', 'alt' => 'TBA'])
		@slot('image', '/images/projects/joyce/joyce-image-6.jpg')
	@endcomponent

	<h3>Careers Site</h3>

	<p>The careers website had to also be re-designed. However, the website was hosted by a third-party vendor, which allowed only a single stylesheet to be uploaded without any modification to the HTML or JavaScript. Simiarly to the main website, cross-browser support had to be provided for IE6 and above.</p>

	<p>For the main website we used JavaScript libraries such as <a href="https://www.github.com/scottjehl/Respond" target="_blank" rel="noopener noreferrer" class="external">Respond</a> and <a href="https://www.github.com/keithclark/selectivizr" target="_blank" rel="noopener noreferrer" class="external">Selectivizr</a> as polyfills for CSS3 features such as media queries, <code>calc</code> sizes, and integer/operator/pseudo selectors. Without support of custom JavaScript, ensuring a cross-browser compatibility responsive design with only a single stylesheet for pre-determined HMTL was a huge challenge.</p>

	<p>We overcame this by extensive use of perctange size units, <code>display: table</code>, and <code>table-layout: fixed</code> to enable a responsive design, with a mixture of both fluid and fixed-sizes elements (with the added bonus of easy vertical alignment using <code>vertical-align: middle</code>).</p>

@endsection
