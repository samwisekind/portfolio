@foreach ($projects as $project)

	@if ($project->key === $featured)

		<div class="featured">

			<div class="container">
				<div class="text">
					<h2><a href="{{ $app->make('url')->to('/projects/' . $project->key) }}">{{ $project->title }}</a></h2>
					<p>{{ $project->description }}</p>
					<a href="{{ $app->make('url')->to('/projects/' . $project->key) }}" class="link"><span class="link-text">View Project</span></a>
				</div>
				<div class="preview">
					<video width="480" autoplay loop muted class="preview-video">
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