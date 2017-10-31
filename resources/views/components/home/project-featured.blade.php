@isset($featured)

	<section class="featured">

		<div class="container">

			<div class="text">

				<h2>
					<a href="{{ route('project', ['project' => $featured->key]) }}">{{ $featured->title }}</a>
				</h2>

				<p>{{ $featured->description }}</p>

				<div class="links">

					@include('components.link', [
						'url' => route('project', ['project' => $featured->key]),
						'icon' => 'arrow',
						'text' => 'Learn more'
					])

					@if(isset($featured->url_article))
						@include('components.link', [
							'url' => $featured->url_article,
							'icon' => 'external',
							'text' => 'Read article'
						])
					@elseif(isset($featured->url_website))
						@include('components.link', [
							'url' => $featured->url_website,
							'icon' => 'external',
							'text' => 'View website'
						])
					@endif

				</div>

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

			@if(isset($featured->preview_video) || isset($featured->preview_image))

				<a href="{{ route('project', ['project' => $featured->key]) }}" class="preview">

					@isset($featured->preview_image)
						<img src="{{ $featured->preview_image }}" class="preview-image" alt="Preview image for the {{ $featured->title }} project." />
					@endisset

				</a>

			@endif

		</div>

	</section>

@endisset
