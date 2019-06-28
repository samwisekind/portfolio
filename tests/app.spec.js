const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

const packageFile = require('../package.json');

describe('App', () => {
  it('Got version content', async () => request(app)
    .get('/version')
    .set('Accept', 'application/json')
    .then((result) => {
      const { status, type, body } = result;
      const { version, environment, viewCache } = body;

      expect(status).to.equal(200);
      expect(type).to.equal('application/json');

      expect(version).to.equal(packageFile.version);
      expect(environment).to.equal(app.get('env'));
      expect(viewCache).to.equal(app.get('view cache') || false);
    }));

  it('Got robots.txt', async () => request(app)
    .get('/robots.txt')
    .set('Accept', '*')
    .then((result) => {
      const { status, type, text } = result;

      expect(status).to.equal(200);
      expect(type).to.equal('text/plain');
      expect(text).to.equal('User-agent: *\nDisallow: /');
    }));

  it('Got redirect for non-existing route', async () => request(app)
    .get('/this-route-should/not/exist')
    .set('Accept', '*')
    .then((result) => {
      const { status, headers } = result;

      expect(status).to.equal(302);
      expect(headers.location).to.equal('/');
    }));
});
