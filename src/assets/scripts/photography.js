/* eslint-disable no-param-reassign */
const albums = Array.from(document.querySelectorAll('.js-album'));
const photos = Array.from(document.querySelectorAll('.js-photo'));
const gallery = document.querySelector('.js-gallery');
const columns = Array.from(gallery.querySelectorAll('.js-column'));

const breakpoints = {
  large: 1200,
  small: 800,
};

/**
 * Filter by albums
 * @param {Object} element Album button to filter by
 */
const filterPhotos = (target) => {
  const key = target.getAttribute('data-album');

  photos.forEach((photo) => {
    if (key === 'all' || photo.getAttribute('data-album') === key) {
      return photo.classList.remove('hidden');
    }
    return photo.classList.add('hidden');
  });

  albums.find((album) => album.classList.contains('active')).classList.remove('active');
  target.classList.add('active');
};

/**
 * Sorts photos by columns to ensure photos are ordered correctly in columns
 */
const sortPhotos = () => {
  let number = 1;
  let className = 'small';
  if (window.innerWidth > breakpoints.small && window.innerWidth <= breakpoints.large) {
    number = 2;
    className = 'medium';
  } else if (window.innerWidth > breakpoints.large) {
    number = 3;
    className = 'large';
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

  photos.forEach((element, index) => columns[index % number].appendChild(element));
};

albums.forEach((element) => element.addEventListener('click', (event) => {
  event.preventDefault();
  filterPhotos(element);
}));

window.addEventListener('resize', sortPhotos);
sortPhotos();
