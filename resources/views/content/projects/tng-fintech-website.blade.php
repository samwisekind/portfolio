@extends ('layouts.project')

@section ('project-content')

	@include('components.projects.project-highlights', ['items' => [
		'Multi-language, responsive, IE7-compatible website',
		'Animated 3D globe using SVG, Canvas, and WebGL',
		'Custom CMS for effective SEO in all languages'
	]])

	<p>For this project I was responsible for project management, creative direction, backend development, and all frontend development. The website was awarded the following:</p>

	<ul>
		<li><a href="https://www.awwwards.com/sites/tng-fintech-group" target="_blank" rel="noopener noreferrer" class="external">Awwwards</a> – User Approved award (05<sup>th</sup> September 2017)</li>
		<li><a href="https://www.cssdesignawards.com/sites/tng-fintech-group/31268/" target="_blank" rel="noopener noreferrer" class="external">CSS Design Awards</a> – Special Kudos award (05<sup>th</sup> September 2017)</li>
	</ul>

	<hr />

	<p>The TNG FinTech Website is the corporate website for the TNG FinTech Group company, which contains company details, news, press releases, media resources, and contact information. The website is fully responsive, supports five languages, and is compatible with IE7 and Android 4.2.</p>

	@component('components.projects.project-image', ['size' => 'large', 'alt' => 'Screenshot of the website front-page hero section.'])
		@slot('image', '/images/projects/tng-fintech-website/tng-fintech-website-image-hero-full.png')
	@endcomponent

	<p>The website features a darker colour palette than <a href="{{ route('project', ['project' => 'tng-website']) }}">its sister website</a> – bright and deep purples and blues are used in the background, juxtaposed by the vibrant cyans and whites in the foreground, adding a bold yet colourful contrast to the overall design. This contrast not only compliments the large and heavily-weighted typefaces, but also the simple shapes used for links and buttons – helping ensure the copywriting is legible and easy to read, and that navigation is clear throughout the website, respectively. The use of thin lines and sans-serif fonts adds a professional and corporate tone to overall design.</p>

	<p>The front-page features a hero section comprised of an animated 3D globe, created using SVG, Canvas, and WebGL (with <a href="https://threejs.org" target="_blank" rel="noopener noreferrer" class="external">three.js</a>).

	@component('components.projects.project-caption', ['autoplay' => true, 'alt' => 'Another screenshot of the website front-page hero section.'])
		@slot('video', '/videos/projects/tng-fintech-website/tng-fintech-website-video-hero')
		@slot('image', '/images/projects/tng-fintech-website/tng-fintech-website-image-hero.png')
		@slot('caption')
			A technical article describing the production process of the 3D globe <a href="{{ $project->url_article }}" target="_blank" rel="noopener noreferrer" class="external">can be read here</a>.
		@endslot
	@endcomponent

	<p>The globe is introduced with a dramatic explosion of small dots that move into place and form a 3D dot-model of the Earth's basic geography, creating an eye-catching effect for first-time visitors. <span class="highlight">The introduction animation is randomized each time the page is loaded, making every visit unique</span>.</p>

	<p>The globe represents the countries that the company currently has business in. Lines are drawn in-between these countries and dots are randomly generated and animated across the lines, illustrating the movement of money between countries. The globe rotates and transitions between the countries, hiding and showing the respective lines at the same time.</p>

	@component('components.projects.project-caption', ['autoplay' => false, 'alt' => 'Video showing the About Us page animation.'])
		@slot('video', '/videos/projects/tng-fintech-website/tng-fintech-website-video-about')
		@slot('image', '/images/projects/tng-fintech-website/tng-fintech-website-image-about.png')
		@slot('caption')
			Smooth transitions are achieved by using <code>translateZ</code> to invoke hardware-accelerated transitions and <code>will-change</code> for ahead-of-time browser optimizations.
		@endslot
	@endcomponent

	<p>The use of simple CSS-based shapes to decorate the background and foreground keeps the website lightweight and fast-loading, with <span class="highlight">most pages being delivered in under a few hundred kilobytes</span>. The use of simple elements also enables the website to be highly accessible and cross-browser compatible, with fall-backs provided where necessary (such as the 3D globe on the front-page).</p>

	@component('components.projects.project-image', ['size' => 'large', 'alt' => 'Screenshot of a press release detail page.'])
		@slot('image', '/images/projects/tng-fintech-website/tng-fintech-website-image-press.png')
	@endcomponent

	<p>The website also features a custom-built CMS, providing the ability to publish customised new stories and press releases in multiple languages, which in turn enables them to be <span class="highlight">highly optimised for search-engines for each respective language</span>. MailChimp integration was also included for both the subscription mailing list and Contact Us page form.</p>

@endsection
