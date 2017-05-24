@extends ('master')

@section ('css')

	<link href="/css/home.css" rel="stylesheet">

@endsection

@section ('content')

	<div class="home">

		@isset($featured)

			@include ('components.project-featured')

		@endisset

		<div class="list">

			@isset($featured)

				@foreach ($projects as $project)

					@if ($project->key === $featured)

						@continue

					@endif

					<div class="project">

						<a href="{{ $app->make('url')->to('/projects/' . $project->key) }}" class="image">
							<img src="{{ $project->thumbnail }}" alt="" />
						</a>

						<h2><a href="{{ $app->make('url')->to('/projects/' . $project->key) }}">{{ $project->title }}</a></h2>
						<p>{{ $project->description }}</p>

					</div>

				@endforeach

			@endisset

		</div>

	</div>

@endsection
