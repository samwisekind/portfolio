const request = require('supertest');

const app = require('../src/app');

const packageFile = require('../package.json');

describe('App', () => {
  it('Got status check', async (done) => {
    const result = await request(app)
      .get('/status')
      .expect(200);

    expect(result.text).toBe('');

    done();
  });

  it('Got version content', async (done) => {
    const result = await request(app)
      .get('/version')
      .set('Accept', 'application/json');

    const { status, type, body } = result;
    const { version, environment, viewCache } = body;

    expect(status).toBe(200);
    expect(type).toBe('application/json');

    expect(version).toBe(packageFile.version);
    expect(environment).toBe(app.get('env'));
    expect(viewCache).toBe(app.get('view cache') || false);

    done();
  });

  it('Got robots.txt', async (done) => {
    const result = await request(app)
      .get('/robots.txt')
      .set('Accept', '*');

    const { status, type, text } = result;

    expect(status).toBe(200);
    expect(type).toBe('text/plain');
    expect(text).toBe('User-agent: *\nDisallow:');

    done();
  });

  it('Got redirect for non-existing route', async (done) => {
    const result = await request(app)
      .get('/this-route-should/not/exist')
      .set('Accept', '*');

    const { status, headers } = result;

    expect(status).toBe(302);
    expect(headers.location).toBe('/');

    done();
  });
});
