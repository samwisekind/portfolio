<div class="project-caption js-caption">

	<div class="media">

		@isset($video)

			<div class="video-play">
				@include('components.link', [
					'url' => '#',
					'icon' => 'play',
					'text' => 'Play video'
				])
			</div>

			<video loop muted poster="{{ $image }}" class="video-element js-video" @isset($width) style="max-width: {{ $width . 'px' }}" @endisset>
				<source src="{{ $video }}.mp4" type="video/mp4">
				<source src="{{ $video }}.webm" type="video/webm">
				<source src="{{ $video }}.ogv" type="video/ogg">
			</video>

		@endisset

		<img src="{{ $image }}" alt="{{ $alt }}" class="image-element" @isset($width) style="max-width: {{ $width . 'px' }}" @endisset />

	</div>

	<figcaption class="text">{{ $caption }}</figcaption>

</div>
