<!DOCTYPE html>

<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi">
		<title>Flamov<?php if ($title) { echo ' – ' . $title; } ?></title>
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
