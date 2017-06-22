@foreach($projects as $project)

	@if($project->key === $featured)

		<div class="featured">

			<div class="container">

				<div class="text">

					<h2><a href="{{ $app->make('url')->to('/projects/' . $project->key) }}">{{ $project->title }}</a></h2>

					<p>{{ $project->description }}</p>

					@include('components.link', [
						'url' => $app->make('url')->to('/projects/' . $project->key),
						'icon' => 'arrow',
						'text' => 'View project'
					])

					@isset($project->technologies)
						<ul class="technologies">
							@php
								$technologiesArray = explode('; ', $project->technologies);
							@endphp
							@foreach($technologiesArray as $technology)
								<li>{{ $technology }}</li>
							@endforeach
						</ul>
					@endisset

				</div>

				<div class="preview">
					<video autoplay loop muted @isset($project->preview_image) poster="{{ $project->preview_image }}" @endisset class="preview-video">
						<source src="{{ $app->make('url')->to('/videos/projects/tng-website/tng-website-preview.mp4') }}" type="video/mp4">
						<source src="{{ $app->make('url')->to('/videos/projects/tng-website/tng-website-preview.webm') }}" type="video/webm">
						<source src="{{ $app->make('url')->to('/videos/projects/tng-website/tng-website-preview.ogv') }}" type="video/ogg">
					</video>
					<div class="preview-image" @isset($project->preview_image) style="background-image: url('{{ $project->preview_image }}')" @endisset></div>
				</div>

			</div>

		</div>

		@break

	@endif

@endforeach
