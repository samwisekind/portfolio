<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', ['as' => 'home', function () {

	// Get the featured project ID from the config table
	$featured = app('db')->table('config')
		->value('featured_project');

	// Get the projects from the projects table
	$projects = app('db')->table('projects')
		->where('enabled', true)
		->orderBy('order', 'asc')
		->get();

	// Check if a featured project ID has been set (is not null)
	if (isset($featured) === true) {

		// Find the featured project by its ID
		$featured = $projects->where('key', $featured)
			->where('enabled', true)
			->first();

		// If the project has been found by its ID, remove it from the projects list
		if (isset($featured) === true) {
			$projects = $projects->where('key', '!==', $featured->key)
				->where('enabled', true);
		}

	}

	return view('layouts.home', [
		'page_section' => 'home',
		'featured' => $featured,
		'projects' => $projects
	]);

}]);

$router->get('/projects/{project}', ['as' => 'project', function ($project) {

	$result = app('db')->table('projects')
		->where('key', $project)
		->first();

	if ($result !== null) {
		return view('content.projects.' . $project, [
			'page_section' => 'project',
			'page_title' => $result->title,
			'page_description' => $result->description,
			'page_image' => app()->make('url')->to($result->preview_image),
			'project' => $result
		]);
	}
	else {
		return abort(404);
	}

}]);

$router->get('/api/album', function ($album = 'portfolio') {

	$result = app('db')->table('albums')
		->orderBy('order', 'asc')
		->get();

	return $result;

});

$router->get('/api/album/{album}', function ($album) {

	// Key the album ID from the URL query key
	$target_album = app('db')->table('albums')
		->where('key', '=', $album)
		->value('id');

	if ($target_album !== null) {

		$result = app('db')->table('mapping')
			->join('albums', 'mapping.album_id', '=', 'albums.id')
			->join('photos', 'mapping.photo_id', '=', 'photos.id')
			->where('mapping.album_id', '=', $target_album)
			->orderBy('mapping.order', 'asc')
			->get();

		if (count($result) === 0) {
			abort(404);
		}
		else {
			return $result;
		}

	}
	else {
		abort(404);
	}

});

$router->get('/photography', ['as' => 'photography', function () {

	return view('layouts.photography', [
		'page_section' => 'photography',
		'page_title' => 'Photography',
		'page_description' => 'Photography portfolio and albums.',
		'page_image' => app()->make('url')->to('/images/albums/kenya/kenya_1_full.jpg')
	]);

}]);

$router->get('/articles', ['as' => 'articles', function () {

	// Get the articles from the articles table
	$articles = app('db')->table('articles')
		->where('enabled', true)
		->orderBy('published', 'desc')
		->get();

	return view('layouts.articles', [
		'page_section' => 'articles',
		'page_title' => 'Articles',
		'articles' => $articles
	]);

}]);

$router->get('/about', ['as' => 'about', function () {

	return view('layouts.about', [
		'page_section' => 'about',
		'page_title' => 'About'
	]);

}]);
