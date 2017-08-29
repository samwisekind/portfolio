@extends ('layouts.project')

@section ('project-content')

	@include('components.projects.project-highlights', ['items' => [
		'Multi-language responsive website',
		'Compatible with IE6 and above',
		'Custom WordPress plugin for unique grid design',
		'Relational and inter-connected stores and brands directory'
	]])

	<p>For this project I was responsible for creative direction, all design work, and all frontend development.</p>

	<hr />

	<p>Joyce is one of Hong Kong's most famous and respected luxury retailers, and they needed a new online identity. The task was to redesign their website from the ground-up for the modern internet. At the time of development <a href="https://tongji.baidu.com/data/browser" target="_blank" rel="noopener noreferrer" class="external">up to 30%</a> of users in China still used Internet Explorer 8; ensuring cross browser compatibility while maintaining a pixel-perfect design appropriate for such a prestigious brand was a fundamental and challenging goal of the project.</p>

	<p>I designed the website with Joyce's brand in mind: simple yet striking. The colour palette consists entirely of blacks and whites, acting simply as the monochrome canvas for the world of colour stemming from the evocative photographs and vibrant illustrations featured prominently throughout each page. Exclusive use of uppercase sans-serif typefaces mixed with simple shapes and hairline borders frame the website with a chic contemporary look.</p>

	@component('components.projects.project-image', ['size' => 'large', 'alt' => 'Screenshot of the front-page of the website.'])
		@slot('image', '/images/projects/joyce/joyce-home.png')
	@endcomponent

	<p>The majority of fashion websites developed at the time featured simple front-page designs comprised of a full-screen video with basic text and links to the rest of the site. Joyce wanted theirs to be different and unique, while still being able feature large images or videos.</p>

	<p>I developed a responsive grid design where each cell or a range of cells feature an image or video as well as hyperlinks. A custom WordPress plugin was also developed that allowed for images, videos, and hyperlinks to be uploaded and placed in single grid cells or across multiple cells, allowing the client to easily decorate and manage the grid sections.</p>

	@component('components.projects.project-caption', ['alt' => 'Screenshot of a section landing page, showing the header grid.'])
		@slot('image', '/images/projects/joyce/joyce-image-grid.png')
		@slot('caption', 'Each sub-section of the website features its own small grid layout, unique to that section.')
	@endcomponent

	<p>Sub-sections of the site – fashion, beauty, and art – feature their own unique page designs, focusing on what's important for that section. Fashion pages feature large paragraphs and full-width images, beauty pages feature links to product pages and information, and art pages feature interactive image galleries.</p>

	@component('components.projects.project-caption', ['alt' => 'Screenshot of a feature article.'])
		@slot('image', '/images/projects/joyce/joyce-image-feature.jpg')
		@slot('caption', 'Videos on the website use the HTML5 video API, with a lightweight Flash video player fall-back.')
	@endcomponent

	<h3>Stores and Brands</h3>

	<p>The stores and brands page contains a searchable and filterable directory of relationally-connected list of stores and brands, displaying what brands are stocked in which stores and where each store is located in each country.</p>

	@component('components.projects.project-caption', ['autoplay' => true, 'alt' => 'Screenshot of brands being filtered in the stores and brands directory page.'])
		@slot('video', '/videos/projects/joyce/joyce-video-brands')
		@slot('image', '/images/projects/joyce/joyce-image-brands.jpg')
		@slot('caption', 'A grid of letters fades in and out as brands are filtered in real-time.')
	@endcomponent

	@component('components.projects.project-caption', ['alt' => 'Screenshot of a store page.'])
		@slot('image', '/images/projects/joyce/joyce-image-store.jpg')
		@slot('caption', 'The stores directory contains information such as opening times, contact numbers, and store address.')
	@endcomponent

	<h3>e-Shop development</h3>

	<p>Several mock-ups and proof-of-concepts were designed and developed for a second phase of development. The aim was to implement an e-commerce platform with Magento and integrate various features across the site.</p>

	<p>Features included a site-wide shopping basket, real-time tracking of online and physical store stock and inventory, membership and loyalty program management, native iOS and Android store-app development, and more.</p>

	@component('components.projects.project-image', ['size' => 'small', 'alt' => 'Image showing the design mock-up for the e-Shop front-page.'])
		@slot('image', '/images/projects/joyce/joyce-image-eshop-store.jpg')
	@endcomponent

	@component('components.projects.project-image', ['size' => 'small', 'alt' => 'Image showing the design mock-up for the site-wide e-Shop shopping basket.'])
		@slot('image', '/images/projects/joyce/joyce-image-eshop-basket.jpg')
	@endcomponent

	<h3>Careers Site</h3>

	<p>The careers website had to also be re-designed. However, the website was hosted by a third-party vendor, which allowed only a single stylesheet to be uploaded without any modification to the HTML or JavaScript. Simiarly to the main website, cross-browser support had to be provided for IE6 and above.</p>

	<p>For the main website we used JavaScript libraries such as <a href="https://www.github.com/scottjehl/Respond" target="_blank" rel="noopener noreferrer" class="external">Respond</a> and <a href="https://www.github.com/keithclark/selectivizr" target="_blank" rel="noopener noreferrer" class="external">Selectivizr</a> as polyfills for CSS3 features such as media queries, <code>calc</code> sizes, and integer/operator/pseudo selectors. Without support of custom JavaScript, ensuring a cross-browser compatibility responsive design with only a single stylesheet for pre-determined HMTL was a huge challenge.</p>

	<p>We overcame this by extensive use of perctange size units, <code>display: table</code>, and <code>table-layout: fixed</code> to enable a responsive design, with a mixture of both fluid and fixed-sizes elements (with the added bonus of easy vertical alignment using <code>vertical-align: middle</code>).</p>

@endsection
