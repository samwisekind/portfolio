/* eslint-disable no-param-reassign */

import lazyLoad from './global';

const albums = (document.querySelector('.js-albums') as HTMLSelectElement);
const photos = Array.from(document.querySelectorAll('.js-photo'));

/**
 * Updates the URL based on the currently selected album key
 */
const updateURL = () => {
  let url = `${window.location.href}?album=${albums.value}`;
  if (new URLSearchParams(window.location.search).get('album')) {
    url = window.location.href.replace(/(album=)[^&]+/, `album=${albums.value}`);
  }

  window.history.replaceState(null, window.document.title, url);
};

/**
 * Filter and sort photos by albums
 */
const filterPhotos = () => {
  // Remove all photos first
  photos.forEach((photo) => photo.remove());

  // Get photos that are filtered
  photos.filter((photo) => albums.value === 'all' || photo.getAttribute('data-album') === albums.value);
};

const initialAlbum = new URLSearchParams(window.location.search).get('album');
if (initialAlbum) {
  albums.value = initialAlbum;
  updateURL();
}

albums.addEventListener('input', () => {
  filterPhotos();
  updateURL();
});

lazyLoad.update();
