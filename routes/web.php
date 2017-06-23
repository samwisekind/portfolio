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

$app->get('/', function () {

	// Get the featured project ID from the config table
	$featured = app('db')->table('config')
		->value('featured_project');

	// Get the projects from the projects table
	$projects = app('db')->table('projects')
		->orderBy('order', 'asc')
		->get();

	// Check if a featured project ID has been set (is not null)
	if (isset($featured) === true) {

		// Find the featured project by its ID
		$featured = $projects->where('id', $featured)
			->first();

		// If the project has been found by its ID, remove it from the projects list
		if (isset($featured) === true) {
			$projects = $projects->where('id', '>', $featured->id);
		}

	}

	return view('layouts.home', [
		'section' => 'home',
		'featured' => $featured,
		'projects' => $projects
	]);

});

$app->get('/projects/{project}', function ($project) {

	$result = app('db')->table('projects')
		->where('key', $project)
		->first();

	if ($result !== null) {
		return view('content.projects.' . $project, [
			'section' => 'project',
			'title' => $result->title . ' Project',
			'project' => $result
		]);
	}
	else {
		return abort(404);
	}

});

$app->get('/api/album', function ($album = 'portfolio') {

	$result = app('db')->table('albums')
		->orderBy('order', 'asc')
		->get();

	return $result;

});

$app->get('/api/album/{album}', function ($album) {

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

$app->get('/photography', function () {

	return view('layouts.photography', [
		'section' => 'photography',
		'title' => 'Photography'
	]);

});
