@foreach ($projects as $project)

	@if ($project->key === $featured)

		<div class="featured">

			<div class="container">

				<div class="text">

					<h2><a href="{{ $app->make('url')->to('/projects/' . $project->key) }}">{{ $project->title }}</a></h2>

					<p>{{ $project->description }}</p>

					@if($project->technologies !== '')
						<ul class="technologies">
							@php
								$technologiesArray = explode(', ', $project->technologies);
							@endphp
							@foreach($technologiesArray as $technology)
								<li>{{ $technology }}</li>
							@endforeach
						</ul>
					@endif

					@include ('components.link', [
						'url' => $app->make('url')->to('/projects/' . $project->key),
						'icon' => 'arrow',
						'text' => 'View project'
					])

				</div>

				<div class="preview">
					<video autoplay loop muted class="preview-video">
						<source src="{{ $app->make('url')->to('/videos/projects/tng-website/tng-website-preview.mp4') }}" type="video/mp4">
						<source src="{{ $app->make('url')->to('/videos/projects/tng-website/tng-website-preview.webm') }}" type="video/webm">
						<source src="{{ $app->make('url')->to('/videos/projects/tng-website/tng-website-preview.ogv') }}" type="video/ogg">
					</video>
				</div>

			</div>

		</div>

		@break

	@endif

@endforeach
