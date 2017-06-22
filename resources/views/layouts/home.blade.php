@extends('master')

@section('css')

	<link href="/css/home.css" rel="stylesheet">

@endsection

@section('content')

	<div class="home">

		@isset($featured)
			@include('components.project-featured')
		@endisset

		<div class="list">

			@isset($featured)

				@foreach($projects as $project)

					@if($project->key === $featured || !$project->enabled)
						@continue
					@endif

					<div class="project">

						@isset($project->preview_image)
							<a href="{{ $app->make('url')->to('/projects/' . $project->key) }}" class="preview">
								<img src="{{ $project->preview_image }}" alt="" class="preview-image" />
							</a>
						@endisset

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

					</div>

				@endforeach

			@endisset

		</div>

	</div>

@endsection
