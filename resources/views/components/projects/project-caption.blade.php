<div class="project-caption">

	<div class="media">

		@isset($video)
			<video autoplay loop muted poster="{{ $image }}" class="video-element" @isset($width) style="max-width: {{ $width . 'px' }}" @endisset>
				<source src="{{ $video }}.mp4" type="video/mp4">
				<source src="{{ $video }}.webm" type="video/webm">
				<source src="{{ $video }}.ogv" type="video/ogg">
			</video>
		@endisset

		<img src="{{ $image }}" alt="" class="image-element" @isset($width) style="max-width: {{ $width . 'px' }}" @endisset />

	</div>

	<figcaption class="text">{{ $caption }}</figcaption>

</div>
