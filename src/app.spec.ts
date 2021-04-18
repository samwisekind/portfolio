import request from 'supertest';

import { mockedPhotos, mockedAlbums } from './mocks/photography-mock';

import app from './app';
import { getPhotographyData, getFeaturedPhotos } from './helpers/photography';

jest.mock('./helpers/photography', () => ({
  getPhotographyData: jest.fn(),
  getFeaturedPhotos: jest.fn(),
}));

beforeEach(() => {
  (getPhotographyData as jest.Mock).mockImplementation(() => mockedPhotos);
  (getFeaturedPhotos as jest.Mock).mockImplementation(() => mockedAlbums);
});

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});

it('gets robots', async () => {
  const response = await request(app).get('/robots.txt');

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/plain');
  expect(response.text).toBe('User-agent: *\nDisallow:');
});

it('gets health check', async () => {
  const response = await request(app).get('/status');

  expect(response.status).toBe(200);
  expect(response.text).toBe('OK');
});

it('gets 304 redirect for missing pages', async () => {
  const response = await request(app).get('/foo');

  expect(response.status).toBe(302);
  expect(response.headers.location).toBe('/');
});

it('shows home', async () => {
  const response = await request(app).get('/');

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');
  expect(response.headers['content-security-policy']).toBe('img-src \'self\' https://cdn.flamov.com data:;');

  document.body.innerHTML = response.text;

  expect(document.body.querySelectorAll('section.photography > .wrapper > .photo').length).toBe(2);
  const [photo1, photo2] = document.body.querySelectorAll('section.photography > .wrapper > .photo');

  expect(photo1.querySelectorAll('picture > source').length).toBe(1);
  expect(photo1.querySelector('picture > source')?.getAttribute('data-srcset')).toBe('photo-1-src.webp');
  expect(photo1.querySelector('picture > img')?.getAttribute('data-src')).toBe('photo-1-src.jpg');
  expect(photo1.querySelector('picture > img')?.getAttribute('alt')).toBe('photo 1 alt');
  expect(photo1.querySelector('picture > img')?.getAttribute('style')).toBe('padding-top: calc(200 / 100 * 100%)');
  expect(photo1.querySelector('figcaption .title')?.textContent).toBe('photo 1 title');
  expect(photo1.querySelector('figcaption .location')?.textContent).toBe('photo 1 location');
  expect(photo1.querySelector('figcaption .date')?.textContent).toBe('2010');

  expect(photo2.querySelectorAll('picture > source').length).toBe(0);
  expect(photo2.querySelector('picture > img')?.getAttribute('data-src')).toBe('photo-2-src.jpg');
  expect(photo2.querySelector('picture > img')?.getAttribute('alt')).toBe('photo 2 alt');
  expect(photo2.querySelector('picture > img')?.getAttribute('style')).toBe('padding-top: calc(300 / 400 * 100%)');
  expect(photo2.querySelector('figcaption .title')?.textContent).toBe('photo 2 title');
  expect(photo2.querySelector('figcaption .location')?.textContent).toBe('photo 2 location');
  expect(photo2.querySelector('figcaption .date')?.textContent).toBe('2020');
});

it('shows photography', async () => {
  const response = await request(app).get('/photography');

  expect(getPhotographyData).toHaveBeenCalledTimes(1);

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');
  expect(response.headers['content-security-policy']).toBe('img-src \'self\' https://cdn.flamov.com data:;');

  document.body.innerHTML = response.text;

  expect(document.body.querySelectorAll('section.photography > .controls > select > option').length).toBe(3);
  const [albumAll, album1, album2] = document.body.querySelectorAll('section.photography > .controls > select > option');

  expect((albumAll as HTMLOptionElement).value).toBe('all');
  expect((albumAll as HTMLOptionElement).selected).toBe(true);

  expect((album1 as HTMLOptionElement).value).toBe('test-album-1');
  expect((album1 as HTMLOptionElement).textContent).toBe('Test Album 1');

  expect((album2 as HTMLOptionElement).value).toBe('test-album-2');
  expect((album2 as HTMLOptionElement).textContent).toBe('Test Album 2');

  expect(document.body.querySelectorAll('section.photography > .gallery figure').length).toBe(4);

  const [photo1, photo2, photo3, photo4] = document.body.querySelectorAll('section.photography > .gallery figure');

  expect(photo1.querySelectorAll('picture > source').length).toBe(1);
  expect(photo1.querySelector('picture > source')?.getAttribute('data-srcset')).toBe('photo-1-src.webp');
  expect(photo1.querySelector('picture > img')?.getAttribute('data-src')).toBe('photo-1-src.jpg');
  expect(photo1.querySelector('picture > img')?.getAttribute('alt')).toBe('photo 1 alt');
  expect(photo1.querySelector('picture > img')?.getAttribute('style')).toBe('padding-top: calc(200 / 100 * 100%)');
  expect(photo1.querySelector('figcaption > .info > .title')?.textContent).toBe('photo 1 title');
  expect(photo1.querySelector('figcaption > .info > .location')?.textContent).toBe('photo 1 location');
  expect(photo1.querySelector('figcaption > .date')?.textContent).toBe('2010');

  expect(photo2.querySelectorAll('picture > source').length).toBe(0);
  expect(photo2.querySelector('picture > img')?.getAttribute('data-src')).toBe('photo-2-src.jpg');
  expect(photo2.querySelector('picture > img')?.getAttribute('alt')).toBe('photo 2 alt');
  expect(photo2.querySelector('picture > img')?.getAttribute('style')).toBe('padding-top: calc(300 / 400 * 100%)');
  expect(photo2.querySelector('figcaption > .info > .title')?.textContent).toBe('photo 2 title');
  expect(photo2.querySelector('figcaption > .info > .location')?.textContent).toBe('photo 2 location');
  expect(photo2.querySelector('figcaption > .date')?.textContent).toBe('2020');

  expect(photo3.querySelectorAll('picture > source').length).toBe(1);
  expect(photo3.querySelector('picture > source')?.getAttribute('data-srcset')).toBe('photo-3-src.webp');
  expect(photo3.querySelector('picture > img')?.getAttribute('data-src')).toBe('photo-3-src.jpg');
  expect(photo3.querySelector('picture > img')?.getAttribute('alt')).toBe('photo 3 alt');
  expect(photo3.querySelector('picture > img')?.getAttribute('style')).toBe('padding-top: calc(500 / 500 * 100%)');
  expect(photo3.querySelector('figcaption > .info > .title')?.textContent).toBe('photo 3 title');
  expect(photo3.querySelector('figcaption > .info > .location')?.textContent).toBe('photo 3 location');
  expect(photo3.querySelector('figcaption > .date')?.textContent).toBe('2030');

  expect(photo4.querySelectorAll('picture > source').length).toBe(1);
  expect(photo4.querySelector('picture > source')?.getAttribute('data-srcset')).toBe('photo-4-src.webp');
  expect(photo4.querySelector('picture > img')?.getAttribute('data-src')).toBe('photo-4-src.jpg');
  expect(photo4.querySelector('picture > img')?.getAttribute('alt')).toBe('photo 4 alt');
  expect(photo4.querySelector('picture > img')?.getAttribute('style')).toBe('padding-top: calc(600 / 600 * 100%)');
  expect(photo4.querySelector('figcaption > .info > .title')?.textContent).toBe('photo 4 title');
  expect(photo4.querySelector('figcaption > .info > .location')?.textContent).toBe('photo 4 location');
  expect(photo4.querySelector('figcaption > .date')?.textContent).toBe('2040');
});

it('shows me', async () => {
  const response = await request(app).get('/me');

  expect(response.status).toBe(200);
  expect(response.type).toBe('text/html');
  expect(response.headers['content-security-policy']).toBe('img-src \'self\' https://cdn.flamov.com data:;');
});
