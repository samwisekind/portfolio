<!DOCTYPE html>

<html lang="en" itemscope itemtype="http://schema.org/Article">

	@php

		$meta_title = 'Sam\'s Portfolio';
		$meta_description = 'Default description';
		$meta_image = $app->make('url')->to('/images/seo/meta-image-default.png');

		if (isset($page_title)) {
			if ($page_section === 'project') {
				$page_title = $page_title . ' Project';
			}
			$meta_title = $page_title . ' — ' . $meta_title;
		}

		if (isset($page_description)) {
			$meta_description = $page_description;
		}

		if (isset($page_image)) {
			$meta_image = $meta_image = $app->make('url')->to($page_image);
		}

	@endphp

	<head>
		<!-- Meta -->
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="user-scalable=no, width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, target-densitydpi=device-dpi" />
		<title>{{ $meta_title }}</title>
		<meta name="description" content="{{ $meta_description }}" />
		<meta name="subject" content="{{ $meta_description }}">

		<!-- Link -->
		<link rel="index" href="{{ route('home') }}">
		<link rel="archives" href="{{ route('home') }}">
		<link href="{{ $app->make('url')->to('/css/global.css') }}" rel="stylesheet">
		@yield ('css')

		<!-- Favicons -->
		<link href="{{ $app->make('url')->to('images/seo/favicon-16x16.png') }}?v=1504020340" rel="icon" type="image/png" sizes="16x16" />
		<link href="{{ $app->make('url')->to('images/seo/favicon-32x32.png') }}?v=1504020340" rel="icon" type="image/png" sizes="32x32" />
		<link href="{{ $app->make('url')->to('images/seo/favicon-96x96.png') }}?v=1504020340" rel="icon" type="image/png" sizes="96x96" />
		<link href="{{ $app->make('url')->to('images/seo/favicon-128.png') }}?v=1504020340" rel="icon" type="image/png" sizes="128x128" />
		<link href="{{ $app->make('url')->to('images/seo/favicon-192x192.png') }}?v=1504020340" rel="icon" type="image/png" sizes="192x192" />
		<link href="{{ $app->make('url')->to('images/seo/favicon-196x196.png') }}?v=1504020340" rel="icon" type="image/png" sizes="196x196" />
		<link href="{{ $app->make('url')->to('images/seo/apple-touch-icon-57x57.png') }}?v=1504020340" rel="apple-touch-icon-precomposed" sizes="57x57" />
		<link href="{{ $app->make('url')->to('images/seo/apple-touch-icon-60x60.png') }}?v=1504020340" rel="apple-touch-icon-precomposed" sizes="60x60" />
		<link href="{{ $app->make('url')->to('images/seo/apple-touch-icon-72x72.png') }}?v=1504020340" rel="apple-touch-icon-precomposed" sizes="72x72" />
		<link href="{{ $app->make('url')->to('images/seo/apple-touch-icon-76x76.png') }}?v=1504020340" rel="apple-touch-icon-precomposed" sizes="76x76" />
		<link href="{{ $app->make('url')->to('images/seo/apple-touch-icon-114x114.png') }}?v=1504020340" rel="apple-touch-icon-precomposed" sizes="114x114" />
		<link href="{{ $app->make('url')->to('images/seo/apple-touch-icon-120x120.png') }}?v=1504020340" rel="apple-touch-icon-precomposed" sizes="120x120" />
		<link href="{{ $app->make('url')->to('images/seo/apple-touch-icon-144x144.png') }}?v=1504020340" rel="apple-touch-icon-precomposed" sizes="144x144" />
		<link href="{{ $app->make('url')->to('images/seo/apple-touch-icon-152x152.png') }}?v=1504020340" rel="apple-touch-icon-precomposed" sizes="152x152" />
		<link rel="shortcut icon" href="favicon.ico?v=1504020340" />

		<!-- Open Graph -->
		<meta property="og:title" content="{{ $meta_title }}" />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="{{ $app->make('url')->current() }}" />
		<meta property="og:image" content="{{ $meta_image }}" />
		<meta property="og:description" content="{{ $meta_description }}" />
		<meta property="og:site_name" content="Sam's Portfolio" />

		<!-- Twitter -->
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="{{ $meta_title }}">
		<meta name="twitter:site" content="{{ $app->make('url')->current() }}">
		<meta name="twitter:description" content="{{ $meta_description }}">
		<meta name="twitter:image" content="{{ $meta_image }}">
		<meta itemprop="name" content="Sam's Portfolio">
		<meta itemprop="description" content="{{ $meta_description }}">
		<meta itemprop="image" content="{{ $meta_image }}">

		<!-- Apple iOS -->
		<link rel="apple-touch-icon" href="{{ $app->make('url')->to('images/seo/apple-touch-icon.png') }}">

		<!-- Apple Safari -->
		<link rel="mask-icon" href="{{ $app->make('url')->to('images/seo/mask_icon.svg') }}" color="#9C27B0">

		<!-- Google Android -->
		<meta name="theme-color" content="#9C27B0">

		<!-- Microsoft -->
		<meta name="msapplication-TileColor" content="#9C27B0" />
		<meta name="msapplication-square70x70logo" content="{{ $app->make('url')->to('images/seo/mstile-70x70.png') }}" />
		<meta name="msapplication-TileImage" content="{{ $app->make('url')->to('images/seo/mstile-144x144.png') }}" />
		<meta name="msapplication-square150x150logo" content="{{ $app->make('url')->to('images/seo/mstile-150x150.png') }}" />
		<meta name="msapplication-wide310x150logo" content="{{ $app->make('url')->to('images/seo/mstile-310x150.png') }}" />
		<meta name="msapplication-square310x310logo" content="{{ $app->make('url')->to('images/seo/mstile-310x310.png') }}" />
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
