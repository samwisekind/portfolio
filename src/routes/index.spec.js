/**
 * @jest-environment jsdom
 */

jest.mock('../helpers/journal', () => ({
  getJournalArticlesList: jest.fn(),
}));

jest.mock('../helpers/photography', () => ({
  getPhotos: jest.fn(),
  getFeaturedPhotos: jest.fn(),
}));

const request = require('supertest');

const app = require('../app');

const { getJournalArticlesList } = require('../helpers/journal');
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
        src: 'photo-1-src.jpg',
      },
      {
        order: 1,
        title: 'photo 2 title',
        alt: 'photo 2 alt',
        location: 'photo 2 location',
        album: 'test-album-1',
        date: '2020',
        src: 'photo-2-src.jpg',
      },
      {
        order: 2,
        title: 'photo 3 title',
        alt: 'photo 3 alt',
        location: 'photo 3 location',
        album: 'test-album-2',
        date: '2030',
        src: 'photo-3-src.jpg',
      },
      {
        order: 3,
        title: 'photo 4 title',
        alt: 'photo 4 alt',
        location: 'photo 4 location',
        album: 'test-album-2',
        date: '2040',
        src: 'photo-4-src.jpg',
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
      src: 'photo-1-src.jpg',
    },
    {
      order: 1,
      title: 'photo 2 title',
      alt: 'photo 2 alt',
      location: 'photo 2 location',
      album: 'test-album-2',
      date: '2020',
      src: 'photo-2-src.jpg',
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

  expect(document.body.querySelectorAll('section.journal .item:not(.end)').length).toBe(2);
  const [journal1, journal2] = document.body.querySelectorAll('section.journal .item:not(.end)');

  expect(journal1.querySelector('h3 > a').getAttribute('href')).toBe('/journal/test-1');
  expect(journal1.querySelector('h3 > a').textContent).toBe('foo');
  expect(journal2.querySelector('h3 > a').getAttribute('href')).toBe('/journal/test-2');
  expect(journal2.querySelector('h3 > a').textContent).toBe('hello');

  expect(document.body.querySelectorAll('section.photography .item:not(.end)').length).toBe(2);
  const [photo1, photo2] = document.body.querySelectorAll('section.photography .item:not(.end)');

  expect(photo1.querySelector('img').getAttribute('data-src')).toBe('photo-1-src.jpg');
  expect(photo1.querySelector('img').getAttribute('alt')).toBe('photo 1 alt');
  expect(photo1.querySelector('figcaption .title').textContent).toBe('photo 1 title');
  expect(photo1.querySelector('figcaption .location').textContent).toBe('photo 1 location');
  expect(photo1.querySelector('figcaption .date').textContent).toBe('2010');

  expect(photo2.querySelector('img').getAttribute('data-src')).toBe('photo-2-src.jpg');
  expect(photo2.querySelector('img').getAttribute('alt')).toBe('photo 2 alt');
  expect(photo2.querySelector('figcaption .title').textContent).toBe('photo 2 title');
  expect(photo2.querySelector('figcaption .location').textContent).toBe('photo 2 location');
  expect(photo2.querySelector('figcaption .date').textContent).toBe('2020');
});

it('shows journal list', async () => {
  const response = await request(app).get('/journal');

  expect(getJournalArticlesList).toHaveBeenCalledTimes(1);

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');

  document.body.innerHTML = response.text;

  expect(document.body.querySelectorAll('section.journal > .item').length).toBe(2);
  const [journal1, journal2] = document.body.querySelectorAll('section.journal > .item');

  expect(journal1.querySelector('h2 > a').getAttribute('href')).toBe('/journal/test-1');
  expect(journal1.querySelector('h2 > a').textContent).toBe('foo');
  expect(journal1.querySelectorAll('p')[0].textContent).toBe('bar');
  expect(journal1.querySelectorAll('p')[1].textContent).toBe('1 January 2010');

  expect(journal2.querySelector('h2 > a').getAttribute('href')).toBe('/journal/test-2');
  expect(journal2.querySelector('h2 > a').textContent).toBe('hello');
  expect(journal2.querySelectorAll('p')[0].textContent).toBe('world');
  expect(journal2.querySelectorAll('p')[1].textContent).toBe('5 May 2020');
});

it('shows journal list', async () => {
  const response = await request(app).get('/journal/test-1');

  expect(getJournalArticlesList).toHaveBeenCalledTimes(1);

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');

  document.body.innerHTML = response.text;

  expect(document.body.querySelector('.journal-detail').innerHTML).toBe('<p>Lorem ipsum</p><p class="footnote">Published 1 January 2010</p>');
});

it('shows photography', async () => {
  const response = await request(app).get('/photography');

  expect(getPhotos).toHaveBeenCalledTimes(1);

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');

  document.body.innerHTML = response.text;

  expect(document.body.querySelectorAll('section.photography > .controls > a').length).toBe(3);

  const [albumAll, album1, album2] = document.body.querySelectorAll('section.photography > .controls > a');

  expect(albumAll.getAttribute('data-album')).toBe('all');

  expect(album1.getAttribute('data-album')).toBe('test-album-1');
  expect(album1.textContent).toBe('Test Album 1');

  expect(album2.getAttribute('data-album')).toBe('test-album-2');
  expect(album2.textContent).toBe('Test Album 2');

  expect(document.body.querySelectorAll('section.photography > .gallery figure').length).toBe(4);

  const [photo1, photo2, photo3, photo4] = document.body.querySelectorAll('section.photography > .gallery figure');

  expect(photo1.querySelector('img').getAttribute('data-src')).toBe('photo-1-src.jpg');
  expect(photo1.querySelector('img').getAttribute('alt')).toBe('photo 1 alt');
  expect(photo1.querySelector('figcaption > .info > .title').textContent).toBe('photo 1 title');
  expect(photo1.querySelector('figcaption > .info > .location').textContent).toBe('photo 1 location');
  expect(photo1.querySelector('figcaption > .date').textContent).toBe('2010');

  expect(photo2.querySelector('img').getAttribute('data-src')).toBe('photo-2-src.jpg');
  expect(photo2.querySelector('img').getAttribute('alt')).toBe('photo 2 alt');
  expect(photo2.querySelector('figcaption > .info > .title').textContent).toBe('photo 2 title');
  expect(photo2.querySelector('figcaption > .info > .location').textContent).toBe('photo 2 location');
  expect(photo2.querySelector('figcaption > .date').textContent).toBe('2020');

  expect(photo3.querySelector('img').getAttribute('data-src')).toBe('photo-3-src.jpg');
  expect(photo3.querySelector('img').getAttribute('alt')).toBe('photo 3 alt');
  expect(photo3.querySelector('figcaption > .info > .title').textContent).toBe('photo 3 title');
  expect(photo3.querySelector('figcaption > .info > .location').textContent).toBe('photo 3 location');
  expect(photo3.querySelector('figcaption > .date').textContent).toBe('2030');

  expect(photo4.querySelector('img').getAttribute('data-src')).toBe('photo-4-src.jpg');
  expect(photo4.querySelector('img').getAttribute('alt')).toBe('photo 4 alt');
  expect(photo4.querySelector('figcaption > .info > .title').textContent).toBe('photo 4 title');
  expect(photo4.querySelector('figcaption > .info > .location').textContent).toBe('photo 4 location');
  expect(photo4.querySelector('figcaption > .date').textContent).toBe('2040');
});

it('shows work', async () => {
  const response = await request(app).get('/work');

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');
});
