@extends ('master')

@section ('css')

	<link href="/css/project.css" rel="stylesheet">

@endsection

@section ('content')

	<div class="project-header {{ $project->key }}">

		<div class="wrapper">

			<h2>{{ $project->title }}</h2>
			<p>{{ $project->description }}</p>

			<ul>
				<li class="title">Responsibilities:</li>
				<li>{{ $project->responsibilities }}</li>
			</ul>

			<ul>
				<li class="title">Technologies:</li>
				<li>{{ str_replace(';', ',', $project->technologies) }}</li>
			</ul>

			<ul>
				<li class="title">Timeframe:</li>
				<li>{{ date('M Y', strtotime($project->started)) }} – {{ date('M Y', strtotime($project->ended)) }}</li>
			</ul>

			@isset($project->url_website)

				@include('components.link', [
					'url' => $project->url_website,
					'icon' => 'external',
					'text' => 'View website'
				])

			@endisset

		</div>

	</div>

	<div class="project-content {{ $project->key }}">

		@yield ('project-content')

	</div>

@endsection
