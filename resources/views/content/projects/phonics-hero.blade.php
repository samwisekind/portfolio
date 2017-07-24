@extends ('layouts.project')

@section ('project-content')

	<p>Phonics Hero is an iPad app that contains games that help with synthetic phonics.</p>

	<p>The games were made using the HTML5 <code>canvas</code> API. We used <a href="https://www.greensock.com/tweenmax" target="_blank" rel="noopener noreferrer" class="external">TweenMax</a> for the animations and <a href="http://www.createjs.com/" target="_blank" rel="noopener noreferrer" class="external">CreateJS</a> for audio and touch events, wrapped in a mobile app using <a href="https://cordova.apache.org/" target="_blank" rel="noopener noreferrer" class="external">Cordova</a>.</p>

	@component('components.projects.project-image', ['size' => 'small', 'alt' => 'Screenshot of one of the app\'s games.'])
		@slot('image', '/images/projects/phonics-hero/phonics-hero-image-game.jpg')
	@endcomponent

@endsection
