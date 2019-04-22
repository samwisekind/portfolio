import lazyLoad from './global';

let data;
let thumbnails = [];
let currentAlbum;
let currentIndex;

const elements = {
  sidebar: document.querySelector('.js-sidebar'),
  sidebarWrapper: document.querySelector('.js-sidebar-wrapper'),
  viewer: document.querySelector('.js-viewer'),
  header: document.querySelector('.js-header'),
  subheader: document.querySelector('.js-subheader'),
  albums: document.querySelector('.js-albums'),
};

const resizeThumbnails = () => {
  const { sidebarWrapper } = elements;

  if (window.innerWidth > 800) {
    sidebarWrapper.style.width = null;
  } else {
    const width = thumbnails.reduce((accumulator, element) => {
      let value = element.offsetWidth;
      value += parseInt(getComputedStyle(element).marginLeft, 10);
      value += parseInt(getComputedStyle(element).marginRight, 10);
      return accumulator + value;
    }, 0);

    sidebarWrapper.style.width = `${width}px`;
  }
};

const updateURL = (target) => {
  let url = `${window.location.href}?album=${target}`;
  if (new URLSearchParams(window.location.search).get('album')) {
    url = window.location.href.replace(/(album=)[^&]+/, `album=${target}`);
  }
  window.history.replaceState(null, window.document.title, url);
};

const changePhoto = (target = 0) => {
  const { viewer, sidebar, header, subheader } = elements;
  const { photos } = currentAlbum;

  if (target === 'prev') {
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = photos.length - 1;
    }
  } else if (target === 'next') {
    currentIndex += 1;
    if (currentIndex > photos.length - 1) {
      currentIndex = 0;
    }
  } else {
    currentIndex = target;
  }

  const { title, imageURL } = photos[currentIndex];
  header.innerText = title;
  subheader.innerText = `Photo ${currentIndex + 1} of ${photos.length}`;
  viewer.style.backgroundImage = `url("${imageURL}")`;

  Array.from(thumbnails).forEach(({ classList }) => classList.remove('current'));
  const current = thumbnails[currentIndex];
  current.classList.add('current');

  sidebar.scrollTop = current.offsetTop - (sidebar.offsetHeight / 2) - (current.offsetHeight / 2);
  sidebar.scrollLeft = current.offsetLeft - (sidebar.offsetWidth / 2) - (current.offsetWidth / 2);
};

const changeAlbum = (target) => {
  const { sidebarWrapper } = elements;

  thumbnails = [];
  sidebarWrapper.innerHTML = '';
  currentAlbum = data[target];

  currentAlbum.photos.forEach(({ title, thumbnailURL }, index) => {
    const element = document.createElement('a');
    element.setAttribute('href', '#');
    element.classList.add('thumbnail');
    element.addEventListener('click', (event) => {
      event.preventDefault();
      changePhoto(index);
    });

    const image = document.createElement('img');
    image.setAttribute('alt', title);
    image.setAttribute('data-src', thumbnailURL);
    element.appendChild(image);

    thumbnails.push(element);
    sidebarWrapper.appendChild(element);
  });

  changePhoto();
  resizeThumbnails();
  updateURL(target);

  lazyLoad.update();
};

const setup = (response) => {
  data = response;

  const param = new URLSearchParams(window.location.search).get('album');
  const { albums } = elements;

  Object.keys(data).forEach((key) => {
    const { title } = data[key];

    const option = document.createElement('option');
    option.value = key;
    option.innerText = title;

    if (param === key) {
      option.setAttribute('selected', '');
    }

    if (key === 'portfolio') {
      albums.insertBefore(option, albums.querySelector('optgroup'));
    } else {
      albums.querySelector('optgroup').appendChild(option);
    }
  });

  albums.addEventListener('change', () => changeAlbum(albums.value));

  let target = 'portfolio';
  if (Object.keys(data).includes(param)) {
    target = param;
  }

  changeAlbum(target);
};

Array.from(document.querySelectorAll('.js-arrow')).forEach(element => element.addEventListener('click', (event) => {
  event.preventDefault();
  changePhoto(element.getAttribute('data-target'));
}));

window.addEventListener('keydown', ({ keyCode }) => {
  if (keyCode === 37 || keyCode === 38 || keyCode === 80 || keyCode === 65) {
    changePhoto('prev');
  } else if (keyCode === 39 || keyCode === 40 || keyCode === 78 || keyCode === 68) {
    changePhoto('next');
  }
});

window.addEventListener('resize', resizeThumbnails);

fetch('/api/photos')
  .then(repsonse => repsonse.json())
  .then(setup);
