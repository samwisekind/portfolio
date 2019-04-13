const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

const packageFile = require('../package.json');

describe('App info', () => {
  it('Got version content', async () => request(app)
    .get('/version')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      const { version, environment, viewCache } = response.body;

      expect(version).to.equal(packageFile.version);
      expect(environment).to.equal(app.get('env'));
      expect(viewCache).to.equal(app.get('view cache') || false);
    }));
});
