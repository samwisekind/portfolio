<!DOCTYPE html>

<html>

	<head>
		<title>Flamov<?php if ($title) { echo ' – ' . $title; } ?></title>
		<link href="/css/global.css" rel="stylesheet">
		@yield ('css')
	</head>

	<body>

		<header class="global-header">

			<div class="container">

				<h1 class="header-title">
					<a href="{{ $app->make('url')->to('/') }}">Sam's Portfolio</a>
				</h1>

				<nav class="header-nav">
					<ul>
						<li class="@if ($section === 'project') current @endif"><a href="{{ $app->make('url')->to('/projects') }}"><span>Projects</span></a></li>
						<li class="@if ($section === 'photography') current @endif"><a href="{{ $app->make('url')->to('/photography') }}"><span>Photography</span></a></li>
						<li class="@if ($section === 'contact') current @endif"><a href="{{ $app->make('url')->to('/contact') }}"><span>Contact</span></a></li>
					</ul>
				</nav>

				<ul class="header-links">
					<li class="github"><a href="https://www.github.com/Flamov" target="_blank" rel="noopener noreferrer"><span>GitHub</span></a></li>
					<li class="codepen"><a href="https://www.codepen.io/Flamov" target="_blank" rel="noopener noreferrer"><span>Codepen</span></a></li>
				</ul>

				<a href="#" class="header-hamburger"></a>

			</div>

		</header>
