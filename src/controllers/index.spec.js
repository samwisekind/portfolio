/**
 * @jest-environment jsdom
 */

jest.mock('../helpers/journal', () => ({
  getJournalArticlesList: jest.fn(),
}));

jest.mock('../helpers/photography', () => ({
  getFeaturedPhotos: jest.fn(),
}));

const request = require('supertest');

const app = require('../app');

const { getJournalArticlesList } = require('../helpers/journal');
const { getFeaturedPhotos } = require('../helpers/photography');

beforeEach(() => {
  getJournalArticlesList.mockImplementation(() => ([
    { slug: 'test-1', attributes: { title: 'foo', blurb: 'bar', published: '2019-01-01T12:00:00.000Z' }, content: '<p>Lorem ipsum</p>' },
    { slug: 'test-2', attributes: { title: 'hello', blurb: 'world', published: '2019-05-01T12:00:00.000Z' }, content: '<p>Dolor sit amet</p>' },
  ]));

  getFeaturedPhotos.mockImplementation(() => ([
    { order: 0, title: 'photo 1', alt: 'photo 1 alt', description: 'photo 1 description', date: '2010', src: 'photo-1-src.jpg' },
    { order: 1, title: 'photo 2', alt: 'photo 2 alt', description: 'photo 2 description', date: '2020', src: 'photo-2-src.jpg' }
  ]));
});

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});

describe('showHome', () => {
  it('shows home', async () => {
    const response = await request(app)
      .get('/');

    expect(response.status).toBe(200);

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
