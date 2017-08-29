@extends ('layouts.project')

@section ('project-content')

	@include('components.projects.project-highlights', ['items' => [
		'Multi-language, responsive, IE7-compatible website',
		'Interactive 2D map using SVG and CSS3, with 180 KB total page size',
		'Support knowledge base with Apache Solr/Lucene and JIRA integration'
	]])

	<p>For this project I was responsible for project management, creative direction, and all frontend development.</p>

	<hr />

	<p>The TNG Website is the accompanying website for the TNG Wallet mobile app. The website contains information such as app features, news, and a customer support knowledge base and ticket system. The website is fully responsive, supports three languages, and is compatible with IE7 and Android 4.2.</p>

	<p>The website has a bright and cheerful colour palette of the brand blue mixed with yellows, purples, and whites, complimented by rounded corners and illustrated graphics. A combination of thick rounded and thin sans-serif typefaces adds a playful yet professional tone to the copywriting.</p>

	<p>The front-page features a hero section that is regularly updated for major events. We primarily use SVG elements combined with CSS animations, transitions, and transformations to create eye-catching and light-weight designs.</p>

	@component('components.projects.project-caption', ['autoplay' => false, 'alt' => 'Screenshot of the website front-page hero section.'])
		@slot('video', '/videos/projects/tng-website/tng-website-video-hero')
		@slot('image', '/images/projects/tng-website/tng-website-image-hero.png')
		@slot('caption')
			For the licensing announcement we drew a <a href="https://en.wikipedia.org/wiki/Guilloch%C3%A9" target="_blank" rel="noopener noreferrer" class="external">guilloché pattern</a> in Illustrator, exported it as an SVG, and animated each line with CSS and JavaScript.
		@endslot
	@endcomponent

	<h3>Interactive map</h3>

	<p>The centrepiece of the website is the 'Global Transfer' page, an interactive 2D map displaying the countries where the app is supported.</p>

	@component('components.projects.project-caption', ['autoplay' => true, 'alt' => 'Screenshot of the Global Transfer in its default (world view) state.'])
		@slot('video', '/videos/projects/tng-website/tng-website-video-map')
		@slot('image', '/images/projects/tng-website/tng-website-image-map.png')
		@slot('caption', '	The interactive map was built using a multi-layered SVG, JavaScript, and CSS transitions & transformations.')
	@endcomponent

	<p>Arguably the most complicated page on the site, <span class="highlight">its size is only 180 KB</span>. This was achieved by:</p>

	<ol>
		<li>Compiling JavaScript using the <a href="https://github.com/google/closure-compiler" target="_blank" rel="noopener noreferrer" class="external">Closure Compiler</a> in advanced mode</li>
		<li>Utilizing gzip compression</li>
		<li>Compressing SVG instruction data and writing it directly inline on the page, thereby reducing the number of HTTP requests and <span class="highlight">increasing gzip compression effectiveness</span></li>
	</ol>

	<p>The page was built by drawing a path of the world map in Illustrator and dividing from it outlines for each country into separate layers. The leftover path is then reunited and transformed into a single compound path. The artboard is then exported as an SVG, separating the world map and the country path layers into separate groups. The instruction data for all layers is stored in a database which is rendered as SVG layers on the webpage.</p>

	<p>CSS selectors and JavaScript event listeners were added to the country paths, with CSS declarations changing SVG attributes such as <code>fill</code> to highlight a selected country path. Panning and scaling is controlled by CSS <code>translate</code> and <code>scale</code> transformations, with the values being calculated by JavaScript. Smooth transitions are achieved by using <code>translateZ</code> to invoke hardware-accelerated transitions and <code>will-change</code> for ahead-of-time browser optimizations.</p>

	@component('components.projects.project-caption', ['width' => 375, 'alt' => 'Screenshot of the Global Transfer page mobile layout with a country selected.'])
		@slot('image', '/images/projects/tng-website/tng-website-image-mobile.png')
		@slot('caption', 'The mobile layout for the interactive map supports multi-touch panning and pinching to navigate the map.')
	@endcomponent

	<h3>Support website</h3>

	<p>A custom-built customer support knowledge base was developed using Zend, MySQL, and Apache Solr and Lucene. Customers can search for support articles in all languages supported on the website, view related articles, browse article categories, and submit support tickets.</p>

	<p>When browsing any support page the colour palette changes to a vibrant green in order to invoke feelings of safety, security, and positivity.</p>

	@component('components.projects.project-caption', ['autoplay' => false, 'alt' => 'Screenshot of the support front-page search being used.'])
		@slot('video', '/videos/projects/tng-website/tng-website-video-search')
		@slot('image', '/images/projects/tng-website/tng-website-image-search.png')
		@slot('caption', 'Using Apache Solr and utilizing Apache Lucene\'s intelligent keyword and phrase-matching provides accurate and reliable search results for all languages used on the website.')
	@endcomponent

	<p>Support ticket submission is integrated with the company's internal JIRA system. Submitting a ticket automatically creates a JIRA ticket with relevant information and sends the customer an email and in-app notification of their ticket reference number for future follow-up.</p>

	@component('components.projects.project-caption', ['width' => 375, 'alt' => 'Screenshot of the support ticket submission mobile layout suggesting potentially helpful articles.'])
		@slot('image', '/images/projects/tng-website/tng-website-image-ticket.png')
		@slot('caption', 'To reduce ticket submission and increase self-help rates, potentially helpful articles are suggested during support ticket creation both on the website and in the app.')
	@endcomponent

@endsection
