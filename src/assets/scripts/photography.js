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
 * Filter and sort photos by albums
 * @param {Object=} element Album button to filter by
 */
const sortPhotos = (target = albums.find((album) => album.classList.contains('active'))) => {
  const key = target.getAttribute('data-album');

  albums.find((album) => album.classList.contains('active')).classList.remove('active');
  target.classList.add('active');

  // Remove all photos first
  photos.forEach((photo) => photo.remove());

  // Get photos that are filtered
  photos.filter((photo) => key === 'all' || photo.getAttribute('data-album') === key)
    .forEach((photo, index) => columns[index % columns.length].appendChild(photo));
};

/**
 * Sorts photos by columns to ensure photos are ordered correctly in columns
 */
const sortColumns = () => {
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

  sortPhotos();
};

albums.forEach((element) => element.addEventListener('click', (event) => {
  event.preventDefault();
  sortPhotos(element);
}));

window.addEventListener('resize', sortColumns);
sortColumns();
