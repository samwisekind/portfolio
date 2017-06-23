@isset($featured)

	<div class="featured">

		<div class="container">

			<div class="text">

				<h2><a href="{{ $app->make('url')->to('/projects/' . $featured->key) }}">{{ $featured->title }}</a></h2>

				<p>{{ $featured->description }}</p>

				@include('components.link', [
					'url' => $app->make('url')->to('/projects/' . $featured->key),
					'icon' => 'arrow',
					'text' => 'Learn more'
				])

				@isset($featured->technologies)
					<ul class="technologies">
						@php
							$technologiesArray = explode('; ', $featured->technologies);
						@endphp
						@foreach($technologiesArray as $technology)
							<li>{{ $technology }}</li>
						@endforeach
					</ul>
				@endisset

			</div>

			<div class="preview">
				<a href="{{ $app->make('url')->to('/projects/' . $featured->key) }}" class="preview-link"></a>
				@isset($featured->preview_video)
					<video autoplay loop muted @isset($featured->preview_image) poster="{{ $featured->preview_image }}" @endisset class="preview-video">
						<source src="{{ $featured->preview_video }}.mp4" type="video/mp4">
						<source src="{{ $featured->preview_video }}.webm" type="video/webm">
						<source src="{{ $featured->preview_video }}.ogv" type="video/ogg">
					</video>
				@endisset
				@isset($featured->preview_image)
					<div class="preview-image" style="background-image: url('{{ $featured->preview_image }}')"></div>
				@endisset
			</div>

		</div>

	</div>

@endisset
