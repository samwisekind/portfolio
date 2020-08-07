const request = require('supertest');

const app = require('./app');

const packageFile = require('../package.json');

it('gets robots', async () => {
  const response = await request(app).get('/robots.txt');

  expect(response.text).toBe('User-agent: *\nDisallow:');
});

it('gets version', async () => {
  const response = await request(app).get('/version');

  expect(response.body).toStrictEqual({
    version: packageFile.version,
    environment: 'jest',
  });
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
