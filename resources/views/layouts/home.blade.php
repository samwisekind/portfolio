@extends('master')

@section('css')

	<link href="/css/home.css" rel="stylesheet">

@endsection

@section('content')

	<main class="home">

		@include('components.home.project-featured')

		<section class="list js-list">

			@foreach($projects as $project)

				<div class="project js-project">

					@isset($project->preview_image)

						<a href="{{ route('project', ['project' => $project->key]) }}" class="preview">
							<img src="{{ $project->preview_image }}" alt="Preview image for the {{ $project->title }} project." class="preview-image" />
						</a>

					@endisset

					<div class="text">

						<h2><a href="{{ route('project', ['project' => $project->key]) }}">{{ $project->title }}</a></h2>

						<p>{{ $project->description }}</p>

						<div class="links">

							@include('components.link', [
								'url' => route('project', ['project' => $project->key]),
								'icon' => 'arrow',
								'text' => 'Learn more'
							])

							@if(isset($project->url_article))
								@include('components.link', [
									'url' => $project->url_article,
									'icon' => 'external',
									'text' => 'Read article'
								])
							@elseif(isset($project->url_website))
								@include('components.link', [
									'url' => $project->url_website,
									'icon' => 'external',
									'text' => 'View website'
								])
							@endif

						</div>

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

		</section>

	</main>

@endsection

@section ('javascript')

	<script src="/js/home.js" type="text/javascript"></script>

@endsection
