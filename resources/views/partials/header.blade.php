<!DOCTYPE html>

<html lang="en" itemscope itemtype="http://schema.org/Article">

	@php

		$meta_title = 'Sam\'s Portfolio';
		$meta_description = 'Default description';
		$meta_image = $app->make('url')->to('/images/seo/meta-image-default.png');

		if (isset($page_title)) {
			$meta_title = $page_title . ' Project — ' . $meta_title;
		}

		if (isset($page_description)) {
			$meta_description = $page_description;
		}

		if (isset($page_image)) {
			$meta_image = $meta_image = $app->make('url')->to($page_image);
		}

	@endphp

	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="user-scalable=no, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, target-densitydpi=device-dpi" />
		<title>{{ $meta_title }}</title>
		<meta property="og:title" content="{{ $meta_title }}" />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="{{ $app->make('url')->current() }}" />
		<meta property="og:image" content="{{ $meta_image }}" />
		<meta property="og:description" content="{{ $meta_description }}" />
		<meta property="og:site_name" content="Flamov" />
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="{{ $meta_title }}">
		<meta name="twitter:site" content="{{ $app->make('url')->current() }}">
		<meta name="twitter:description" content="{{ $meta_description }}">
		<meta name="twitter:image" content="{{ $meta_image }}">
		<meta itemprop="name" content="Sam's Portfolio">
		<meta itemprop="description" content="{{ $meta_description }}">
		<meta itemprop="image" content="{{ $meta_image }}">
		<link href="{{ $app->make('url')->to('/css/global.css') }}" rel="stylesheet">
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
