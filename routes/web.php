<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/photography/{album?}', function ($album = null) {

	// Key the album ID from the URL query key
	$target_album = DB::table('albums')
		->where('key', '=', $album)
		->value('id');

	if ($target_album !== null) {

		$result = DB::table('mapping')
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

    return view('welcome', [
    	'photos' => $photos
    ]);

});
