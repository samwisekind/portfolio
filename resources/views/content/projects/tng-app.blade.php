@extends ('layouts.project')

@section ('project-content')

	<p><a href="https://www.tngwallet.hk/" target="_blank" rel="noopener noreferrer" class="external">TNG Wallet</a> is the in-house and flagship app of the TNG company in Hong Kong, a mobile e-wallet spanning many features.</p>

	<p>For this project I was responsible for all web-development activities, such as the front-end architecture, the tailor-made CSS and JavaScript frameworks, building and deployment systems, code review, documentation, and so on.</p>

	<p>I worked on both the current version of the app as well as a major upcoming release. As the next version of the app is still being developed I am unable to disclose many details or screenshots. However, I am able to provide a brief overview of the architecture I designed as well as my experience with the Google Closure Compiler, which you can find the latter in <a href="{{ $project->url_article }}" target="_blank" rel="noopener noreferrer" class="external">an article I have published here</a>, which both the article and this project page are correct as of mid-2017.</p>

	<hr />

	<p>TNG Wallet is a hybrid app consisting of a native and web-view layer. I designed the web layer of the app into two parts:</p>

	<ol>
		<li><b>Common Assets</b> – A bundle of CSS and JavaScript libraries and frameworks, common styles and methods, files, fonts, images, and other resources. This sat at around ~300kB.</li>
		<li><b>Modules</b> – A module contains assets relating to a user story — HTML, CSS, JavaScript, and image files — while linking to the bundle in the common assets for everything else. They are packaged as ZIP archives, which are displayed in web-views by the native layer. The app would re-download the modules over-the-air whenever a module was updated, replacing the previous version.</li>
	</ol>

	<p>While the common assets bundle was rarely updated, the modules were updated multiple times per month (usually for API changes or legal compliance updates). Because of this, we designed the architecture with the following assumptions in mind:</p>

	<ul>
		<li>Users may be using <span class="highlight">limited data plans</span></li>
		<li>Users may have a <span class="highlight">slow or unstable data connection</span></li>
		<li>Users may be using a <span class="highlight">large variety of phone hardware and software</span></li>
	</ul>

	<p>It was <span class="highlight">critically important that module sizes were as small as possible</span>. Therefore, we set the following goals:</p>

	<ul>
		<li><span class="highlight">Reduce the data required and time taken</span> to download modules</li>
		<li><span class="highlight">Improve user experience</span> with responsiveness and consistency</li>
		<li><span class="highlight">Preserve battery life</span> with optimised and reliable performance</li>
	</ul>

	<p>Modules were processed using Gulp tasks that compressed HTML, CSS, JSON, SVG, and bitmap files. The JavaScript was compiled using the <a href="https://www.github.com/google/closure-compiler" target="_blank" rel="noopener noreferrer" class="external">Google Closure Compiler</a>, which in the end enabled us to <span class="highlight">keep module sizes from 4kB for the smallest to 250Kb for the largest</span>. Moreover, it also improved development productivity through its built-in type-checking and code-linting tools.</p>

@endsection
