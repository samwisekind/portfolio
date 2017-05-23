@extends ('master')

@section ('css')

	<link href="/css/home.css" rel="stylesheet">

@endsection

@section ('content')

	<div class="home">

		@include ('components.project-featured')

		<div class="list">

			@foreach ($projects as $project)

				@if ($project->key === $featured)

					@continue

				@endif

				<div class="project">

					<a href="{{ $app->make('url')->to('/projects/' . $project->key) }}" class="image">
						<img src="{{ $project->preview }}" alt="" />
					</a>

					<h2><a href="{{ $app->make('url')->to('/projects/' . $project->key) }}">{{ $project->title }}</a></h2>
					<p>{{ $project->description }}</p>

				</div>

			@endforeach

		</div>

	</div>

@endsection
