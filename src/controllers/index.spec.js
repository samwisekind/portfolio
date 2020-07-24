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
    { slug: 'test-1', attributes: { title: 'foo', blurb: 'bar', published: '2010-01-01T12:00:00.000Z' }, content: '<p>Lorem ipsum</p>' },
    { slug: 'test-2', attributes: { title: 'hello', blurb: 'world', published: '2020-05-05T12:00:00.000Z' }, content: '<p>Dolor sit amet</p>' },
  ]));

  getPhotos.mockImplementation(() => ([
    { order: 0, title: 'photo 1', alt: 'photo 1 alt', description: 'photo 1 description', date: '2010', src: 'photo-1-src.jpg' },
    { order: 1, title: 'photo 2', alt: 'photo 2 alt', description: 'photo 2 description', date: '2020', src: 'photo-2-src.jpg' },
    { order: 2, title: 'photo 3', alt: 'photo 3 alt', description: 'photo 3 description', date: '2030', src: 'photo-3-src.jpg' },
    { order: 3, title: 'photo 4', alt: 'photo 4 alt', description: 'photo 4 description', date: '2040', src: 'photo-4-src.jpg' },
  ]));

  getFeaturedPhotos.mockImplementation(() => ([
    { order: 0, title: 'photo 1', alt: 'photo 1 alt', description: 'photo 1 description', date: '2010', src: 'photo-1-src.jpg' },
    { order: 1, title: 'photo 2', alt: 'photo 2 alt', description: 'photo 2 description', date: '2020', src: 'photo-2-src.jpg' },
  ]));
});

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});

describe('showHome', () => {
  it('shows home', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');

    // expect(getJournalArticlesList).toHaveBeenCalledWith(2);

    document.body.innerHTML = response.text;

    expect(document.body.querySelectorAll('.journal-item').length).toBe(2);
    const [journal1, journal2] = document.body.querySelectorAll('.journal-item');

    expect(journal1.querySelector('h3 > a').getAttribute('href')).toBe('/journal/test-1');
    expect(journal1.querySelector('h3 > a').textContent).toBe('foo');
    expect(journal2.querySelector('h3 > a').getAttribute('href')).toBe('/journal/test-2');
    expect(journal2.querySelector('h3 > a').textContent).toBe('hello');

    expect(document.body.querySelectorAll('.photography-item').length).toBe(2);
    const [photo1, photo2] = document.body.querySelectorAll('.photography-item');

    expect(photo1.querySelector('a').getAttribute('href')).toBe('/photography');
    expect(photo1.querySelector('a > img').getAttribute('src')).toBe('photo-1-src.jpg');
    expect(photo1.querySelector('a > img').getAttribute('alt')).toBe('photo 1 alt');
    expect(photo1.querySelector('a > figcaption').textContent).toBe('photo 1 description');

    expect(photo2.querySelector('a').getAttribute('href')).toBe('/photography');
    expect(photo2.querySelector('a > img').getAttribute('src')).toBe('photo-2-src.jpg');
    expect(photo2.querySelector('a > img').getAttribute('alt')).toBe('photo 2 alt');
    expect(photo2.querySelector('a > figcaption').textContent).toBe('photo 2 description');
  });
});

describe('showJournalList', () => {
  it('shows journal list', async () => {
    const response = await request(app).get('/journal');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');

    document.body.innerHTML = response.text;

    expect(document.body.querySelectorAll('.journal-item').length).toBe(2);
    const [journal1, journal2] = document.body.querySelectorAll('.journal-item');

    expect(journal1.querySelector('h2 > a').getAttribute('href')).toBe('/journal/test-1');
    expect(journal1.querySelector('h2 > a').textContent).toBe('foo');
    expect(journal1.querySelectorAll('p')[0].textContent).toBe('bar');
    expect(journal1.querySelectorAll('p')[1].textContent).toBe('1 January 2010');

    expect(journal2.querySelector('h2 > a').getAttribute('href')).toBe('/journal/test-2');
    expect(journal2.querySelector('h2 > a').textContent).toBe('hello');
    expect(journal2.querySelectorAll('p')[0].textContent).toBe('world');
    expect(journal2.querySelectorAll('p')[1].textContent).toBe('5 May 2020');
  });
});

describe('showJournalArticle', () => {
  it('shows journal list', async () => {
    const response = await request(app).get('/journal/test-1');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');

    document.body.innerHTML = response.text;

    expect(document.body.querySelector('.journal-detail').innerHTML).toBe('<p>Lorem ipsum</p><p class="footnote">Published 1 January 2010</p>');
  });
});

describe('showPhotography', () => {
  it('shows photography', async () => {
    const response = await request(app).get('/photography');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');

    document.body.innerHTML = response.text;

    expect(document.body.querySelectorAll('.photography > figure').length).toBe(4);

    const [photo1, photo2, photo3, photo4] = document.body.querySelectorAll('.photography > figure');

    expect(photo1.querySelector('img').getAttribute('src')).toBe('photo-1-src.jpg');
    expect(photo1.querySelector('img').getAttribute('alt')).toBe('photo 1 alt');
    expect(photo1.querySelector('figcaption > .description').textContent).toBe('photo 1 description');
    expect(photo1.querySelector('figcaption > .date').textContent).toBe('2010');

    expect(photo2.querySelector('img').getAttribute('src')).toBe('photo-2-src.jpg');
    expect(photo2.querySelector('img').getAttribute('alt')).toBe('photo 2 alt');
    expect(photo2.querySelector('figcaption > .description').textContent).toBe('photo 2 description');
    expect(photo2.querySelector('figcaption > .date').textContent).toBe('2020');

    expect(photo3.querySelector('img').getAttribute('src')).toBe('photo-3-src.jpg');
    expect(photo3.querySelector('img').getAttribute('alt')).toBe('photo 3 alt');
    expect(photo3.querySelector('figcaption > .description').textContent).toBe('photo 3 description');
    expect(photo3.querySelector('figcaption > .date').textContent).toBe('2030');

    expect(photo4.querySelector('img').getAttribute('src')).toBe('photo-4-src.jpg');
    expect(photo4.querySelector('img').getAttribute('alt')).toBe('photo 4 alt');
    expect(photo4.querySelector('figcaption > .description').textContent).toBe('photo 4 description');
    expect(photo4.querySelector('figcaption > .date').textContent).toBe('2040');
  });
});

describe('showWork', () => {
  it('shows work', async () => {
    const response = await request(app).get('/work');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
  });
});
