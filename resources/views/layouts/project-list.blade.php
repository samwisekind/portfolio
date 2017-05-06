@extends ('master')

@section ('css')

	<link href="/css/project-list.css" rel="stylesheet">

@endsection

@section ('content')

	<div class="project-list">

		@foreach ($projects as $project)

			<div class="list-item">

				<a href="{{ $app->make('url')->to('/projects/' . $project->key) }}" class="item-image">
					<img src="{{ $project->preview }}" alt="" />
				</a>

				<h2><a href="{{ $app->make('url')->to('/projects/' . $project->key) }}">{{ $project->title }}</a></h2>
				<a href="{{ $app->make('url')->to('/projects/' . $project->key) }}" class="view">View project</a>
				<p>{{ $project->description }}</p>

				<ul class="details">
					<li>{{ $project->responsibilities }}</li>
					<li>{{ $project->technologies }}</li>
				</ul>

			</div>

		@endforeach

	</div>

@endsection
