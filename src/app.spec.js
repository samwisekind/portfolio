const request = require('supertest');

const app = require('./app');

describe('app.js', () => {
  it('gets robots', async () => {
    const response = await request(app).get('/robots.txt');

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
});
