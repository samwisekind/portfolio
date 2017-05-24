<!DOCTYPE html>

<html lang="en" itemscope itemtype="http://schema.org/Article">

	@php

		$pageTitle = "Flamov";
		if (isset($title) === true) {
			$pageTitle = $pageTitle . ' – ' . $title;
		}

		$pageDescription = "Sam's Portfolio";
		if (isset($project) === true) {
			$pageDescription = $project->description;
		}

		if ($section === 'home') {
			foreach ($projects as $project) {
				if ($project->key === 'joyce') {
					$pageImage = $app->make('url')->to($project->cover);
					break;
				}
			}
		}
		else if ($section === 'project') {
			$pageImage = $app->make('url')->to($project->cover);
		}
		else {
			$pageImage = $app->make('url')->to('/images/albums/kenya/kenya_1_full.jpg');
		}

	@endphp

	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="user-scalable=no, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, target-densitydpi=device-dpi" />
		<title>{{ $pageTitle }}</title>
		<meta property="og:title" content="{{ $pageTitle }}" />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="{{ $app->make('url')->current() }}" />
		<meta property="og:image" content="{{ $pageImage }}" />
		<meta property="og:description" content="{{ $pageDescription }}" />
		<meta property="og:site_name" content="Flamov" />
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="{{ $pageTitle }}">
		<meta name="twitter:site" content="{{ $app->make('url')->current() }}">
		<meta name="twitter:description" content="{{ $pageDescription }}">
		<meta name="twitter:image" content="{{ $pageImage }}">
		<meta itemprop="name" content="Flamov">
		<meta itemprop="description" content="{{ $pageDescription }}">
		<meta itemprop="image" content="{{ $pageImage }}">
		<link href="/css/global.css" rel="stylesheet">
		@yield ('css')
	</head>

	<body>

		<div class="outer-wrapper">

			<div class="outer-overlay js-overlay"></div>

			<div class="outer-menu">

				@include ('partials.menu')

			</div>

			<div class="outer-content">

				<header class="global-header">

					<div class="container">

						<h1 class="title">
							<a href="{{ $app->make('url')->to('/') }}">Sam's Portfolio</a>
						</h1>

						<nav>

							@include ('partials.menu')

						</nav>

						<a href="#" class="hamburger js-menu"></a>

					</div>

				</header>
