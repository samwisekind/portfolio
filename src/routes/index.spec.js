/**
 * @jest-environment jsdom
 */

jest.mock('../helpers/writing', () => ({
  getJournalArticlesList: jest.fn(),
}));

jest.mock('../helpers/photography', () => ({
  getPhotos: jest.fn(),
  getFeaturedPhotos: jest.fn(),
}));

const request = require('supertest');

const app = require('../app');

const { getJournalArticlesList } = require('../helpers/writing');
const { getPhotos, getFeaturedPhotos } = require('../helpers/photography');

beforeEach(() => {
  getJournalArticlesList.mockImplementation(() => ([
    {
      slug: 'test-1',
      attributes: {
        title: 'foo',
        blurb: 'bar',
        published: '2010-01-01T12:00:00.000Z',
      },
      content: '<p>Lorem ipsum</p>',
    },
    {
      slug: 'test-2',
      attributes: {
        title: 'hello',
        blurb: 'world',
        published: '2020-05-05T12:00:00.000Z',
      },
      content: '<p>Dolor sit amet</p>',
    },
  ]));

  getPhotos.mockImplementation(() => ({
    albums: [
      {
        name: 'Test Album 1',
        key: 'test-album-1',
      },
      {
        name: 'Test Album 2',
        key: 'test-album-2',
      },
    ],
    photos: [
      {
        order: 0,
        title: 'photo 1 title',
        alt: 'photo 1 alt',
        location: 'photo 1 location',
        album: 'test-album-1',
        date: '2010',
        src: {
          jpg: 'photo-1-src.jpg',
          webp: 'photo-1-src.webp',
        },
      },
      {
        order: 1,
        title: 'photo 2 title',
        alt: 'photo 2 alt',
        location: 'photo 2 location',
        album: 'test-album-1',
        date: '2020',
        src: {
          jpg: 'photo-2-src.jpg',
        },
      },
      {
        order: 2,
        title: 'photo 3 title',
        alt: 'photo 3 alt',
        location: 'photo 3 location',
        album: 'test-album-2',
        date: '2030',
        src: {
          jpg: 'photo-3-src.jpg',
          webp: 'photo-3-src.webp',
        },
      },
      {
        order: 3,
        title: 'photo 4 title',
        alt: 'photo 4 alt',
        location: 'photo 4 location',
        album: 'test-album-2',
        date: '2040',
        src: {
          jpg: 'photo-4-src.jpg',
          webp: 'photo-4-src.webp',
        },
      },
    ],
  }));

  getFeaturedPhotos.mockImplementation(() => ([
    {
      order: 0,
      title: 'photo 1 title',
      alt: 'photo 1 alt',
      location: 'photo 1 location',
      album: 'test-album-1',
      date: '2010',
      src: {
        jpg: 'photo-1-src.jpg',
        webp: 'photo-1-src.webp',
      },
    },
    {
      order: 1,
      title: 'photo 2 title',
      alt: 'photo 2 alt',
      location: 'photo 2 location',
      album: 'test-album-2',
      date: '2020',
      src: {
        jpg: 'photo-2-src.jpg',
      },
    },
  ]));
});

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});

it('shows home', async () => {
  const response = await request(app).get('/');

  expect(getJournalArticlesList).toHaveBeenCalledWith(2);

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');

  document.body.innerHTML = response.text;

  expect(document.body.querySelectorAll('section.writing .item:not(.end)').length).toBe(2);
  const [journal1, journal2] = document.body.querySelectorAll('section.writing .item:not(.end)');

  expect(journal1.querySelector('h3 > a').getAttribute('href')).toBe('/writing/test-1');
  expect(journal1.querySelector('h3 > a').textContent).toBe('foo');
  expect(journal2.querySelector('h3 > a').getAttribute('href')).toBe('/writing/test-2');
  expect(journal2.querySelector('h3 > a').textContent).toBe('hello');

  expect(document.body.querySelectorAll('section.photography .item:not(.end)').length).toBe(2);
  const [photo1, photo2] = document.body.querySelectorAll('section.photography .item:not(.end)');

  expect(photo1.querySelectorAll('picture > source').length).toBe(1);
  expect(photo1.querySelector('picture > source').getAttribute('data-srcset')).toBe('photo-1-src.webp');
  expect(photo1.querySelector('picture > img').getAttribute('data-src')).toBe('photo-1-src.jpg');
  expect(photo1.querySelector('picture > img').getAttribute('alt')).toBe('photo 1 alt');
  expect(photo1.querySelector('figcaption .title').textContent).toBe('photo 1 title');
  expect(photo1.querySelector('figcaption .location').textContent).toBe('photo 1 location');
  expect(photo1.querySelector('figcaption .date').textContent).toBe('2010');

  expect(photo2.querySelectorAll('picture > source').length).toBe(0);
  expect(photo2.querySelector('picture > img').getAttribute('data-src')).toBe('photo-2-src.jpg');
  expect(photo2.querySelector('picture > img').getAttribute('alt')).toBe('photo 2 alt');
  expect(photo2.querySelector('figcaption .title').textContent).toBe('photo 2 title');
  expect(photo2.querySelector('figcaption .location').textContent).toBe('photo 2 location');
  expect(photo2.querySelector('figcaption .date').textContent).toBe('2020');
});

it('shows writing list', async () => {
  const response = await request(app).get('/writing');

  expect(getJournalArticlesList).toHaveBeenCalledTimes(1);

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');

  document.body.innerHTML = response.text;

  expect(document.body.querySelectorAll('section.writing > .item').length).toBe(2);
  const [journal1, journal2] = document.body.querySelectorAll('section.writing > .item');

  expect(journal1.querySelector('h2 > a').getAttribute('href')).toBe('/writing/test-1');
  expect(journal1.querySelector('h2 > a').textContent).toBe('foo');
  expect(journal1.querySelectorAll('p')[0].textContent).toBe('bar');
  expect(journal1.querySelectorAll('p')[1].textContent).toBe('1 January 2010');

  expect(journal2.querySelector('h2 > a').getAttribute('href')).toBe('/writing/test-2');
  expect(journal2.querySelector('h2 > a').textContent).toBe('hello');
  expect(journal2.querySelectorAll('p')[0].textContent).toBe('world');
  expect(journal2.querySelectorAll('p')[1].textContent).toBe('5 May 2020');
});

it('shows writing list', async () => {
  const response = await request(app).get('/writing/test-1');

  expect(getJournalArticlesList).toHaveBeenCalledTimes(1);

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');

  document.body.innerHTML = response.text;

  expect(document.body.querySelector('.writing-detail').innerHTML).toBe('<p>Lorem ipsum</p><p class="footnote">Published 1 January 2010</p>');
});

it('shows photography', async () => {
  const response = await request(app).get('/photography');

  expect(getPhotos).toHaveBeenCalledTimes(1);

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');

  document.body.innerHTML = response.text;

  expect(document.body.querySelectorAll('section.photography > .controls > select > option').length).toBe(3);
  const [albumAll, album1, album2] = document.body.querySelectorAll('section.photography > .controls > select > option');

  expect(albumAll.value).toBe('all');
  expect(albumAll.selected).toBe(true);

  expect(album1.value).toBe('test-album-1');
  expect(album1.textContent).toBe('Test Album 1');

  expect(album2.value).toBe('test-album-2');
  expect(album2.textContent).toBe('Test Album 2');

  expect(document.body.querySelectorAll('section.photography > .gallery figure').length).toBe(4);

  const [photo1, photo2, photo3, photo4] = document.body.querySelectorAll('section.photography > .gallery figure');

  expect(photo1.querySelectorAll('picture > source').length).toBe(1);
  expect(photo1.querySelector('picture > source').getAttribute('data-srcset')).toBe('photo-1-src.webp');
  expect(photo1.querySelector('picture > img').getAttribute('data-src')).toBe('photo-1-src.jpg');
  expect(photo1.querySelector('picture > img').getAttribute('alt')).toBe('photo 1 alt');
  expect(photo1.querySelector('figcaption > .info > .title').textContent).toBe('photo 1 title');
  expect(photo1.querySelector('figcaption > .info > .location').textContent).toBe('photo 1 location');
  expect(photo1.querySelector('figcaption > .date').textContent).toBe('2010');

  expect(photo2.querySelectorAll('picture > source').length).toBe(0);
  expect(photo2.querySelector('picture > img').getAttribute('data-src')).toBe('photo-2-src.jpg');
  expect(photo2.querySelector('picture > img').getAttribute('alt')).toBe('photo 2 alt');
  expect(photo2.querySelector('figcaption > .info > .title').textContent).toBe('photo 2 title');
  expect(photo2.querySelector('figcaption > .info > .location').textContent).toBe('photo 2 location');
  expect(photo2.querySelector('figcaption > .date').textContent).toBe('2020');

  expect(photo3.querySelectorAll('picture > source').length).toBe(1);
  expect(photo3.querySelector('picture > source').getAttribute('data-srcset')).toBe('photo-3-src.webp');
  expect(photo3.querySelector('picture > img').getAttribute('data-src')).toBe('photo-3-src.jpg');
  expect(photo3.querySelector('picture > img').getAttribute('alt')).toBe('photo 3 alt');
  expect(photo3.querySelector('figcaption > .info > .title').textContent).toBe('photo 3 title');
  expect(photo3.querySelector('figcaption > .info > .location').textContent).toBe('photo 3 location');
  expect(photo3.querySelector('figcaption > .date').textContent).toBe('2030');

  expect(photo4.querySelectorAll('picture > source').length).toBe(1);
  expect(photo4.querySelector('picture > source').getAttribute('data-srcset')).toBe('photo-4-src.webp');
  expect(photo4.querySelector('picture > img').getAttribute('data-src')).toBe('photo-4-src.jpg');
  expect(photo4.querySelector('picture > img').getAttribute('alt')).toBe('photo 4 alt');
  expect(photo4.querySelector('figcaption > .info > .title').textContent).toBe('photo 4 title');
  expect(photo4.querySelector('figcaption > .info > .location').textContent).toBe('photo 4 location');
  expect(photo4.querySelector('figcaption > .date').textContent).toBe('2040');
});

it('shows me', async () => {
  const response = await request(app).get('/me');

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');
});
