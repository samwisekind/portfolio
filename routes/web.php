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

	$result = app('db')->table('projects')
		->get();

	return view('layouts.home', [
		'section' => 'home',
		'featured' => 'joyce',
		'projects' => $result
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
		return redirect('/projects');
	}

});

$app->get('/api/album', function ($album = 'portfolio') {

	$result = app('db')->table('albums')
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
