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

				@foreach ($projects as $item)

					@if ($item->key === $featured)

						@continue

					@endif

					<div class="project">

						<a href="{{ $app->make('url')->to('/projects/' . $item->key) }}" class="image">
							<img src="{{ $item->thumbnail }}" alt="" />
						</a>

						<h2><a href="{{ $app->make('url')->to('/projects/' . $item->key) }}">{{ $item->title }}</a></h2>
						<p>{{ $item->description }}</p>

					</div>

				@endforeach

			@endisset

		</div>

	</div>

@endsection
