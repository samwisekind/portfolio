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

$app->get('/', function () use ($app) {
    return view('master');
});

$app->get('/projects/{project}', function ($project) {

	$result = app('db')->table('projects')
		->where('key', $project)
		->first();

	return view('layout.projects.' . $project, [
		'section' => 'project',
		'title' => $result->title,
		'project' => $result
	]);

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
			return 'No photos found';
		}
		else {
			return $result;
		}

	}
	else {
		return 'No album found';
	}

});

$app->get('/photography', function () {

	return view('layout.photography', [
		'section' => 'photography',
		'title' => 'Photography'
	]);

});
