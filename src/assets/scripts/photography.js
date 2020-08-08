/* eslint-disable no-param-reassign */

import lazyLoad from './global';

const albums = document.querySelector('.js-albums');
const photos = Array.from(document.querySelectorAll('.js-photo'));
const gallery = document.querySelector('.js-gallery');
const columns = Array.from(gallery.querySelectorAll('.js-column'));

const breakpoint = 1000;

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
const sortPhotos = () => {
  // Remove all photos first
  photos.forEach((photo) => photo.remove());

  // Get photos that are filtered
  photos.filter((photo) => albums.value === 'all' || photo.getAttribute('data-album') === albums.value)
    .forEach((photo, index) => columns[index % columns.length].appendChild(photo));
};

/**
 * Sorts photos by columns to ensure photos are ordered correctly in columns
 */
const sortColumns = () => {
  let number = 1;
  let className = 'small';
  if (window.innerWidth > breakpoint) {
    number = 2;
    className = 'medium';
  }

  // Nullify the element to ensure it's removed by the garbage collector
  columns.splice(0).forEach((element) => {
    element.remove();
    element = null;
  });

  for (let i = 0; i < number; i += 1) {
    const element = document.createElement('div');
    element.classList.add('column', className);

    gallery.appendChild(element);
    columns.push(element);
  }

  sortPhotos();
};

const initialAlbum = new URLSearchParams(window.location.search).get('album');
if (initialAlbum) {
  albums.value = initialAlbum;
  updateURL();
}

albums.addEventListener('input', () => {
  sortPhotos();
  updateURL();
});

window.addEventListener('resize', sortColumns);

sortColumns();

lazyLoad.update();
