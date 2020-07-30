/* eslint-disable no-param-reassign */

import lazyLoad from './global';

const albums = document.querySelector('.js-albums');
const photos = Array.from(document.querySelectorAll('.js-photo'));
const gallery = document.querySelector('.js-gallery');
const columns = Array.from(gallery.querySelectorAll('.js-column'));

const breakpoint = 800;

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

  // Don't do anything if columns don't need to be resorted
  if (columns.length === number) {
    return;
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

albums.addEventListener('input', sortPhotos);
window.addEventListener('resize', sortColumns);

lazyLoad.update();

sortColumns();
