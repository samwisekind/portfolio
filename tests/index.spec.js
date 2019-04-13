const request = require('supertest');
const { expect } = require('chai');
const cheerio = require('cheerio');

const app = require('../src/app');

describe('Index', () => {
  it('Got index page and correct content', (done) => {
    request(app)
      .get('/')
      .set('Accept', '*/*')
      .then((result) => {
        expect(result.status).to.equal(200);
        expect(result.type).to.equal('text/html');

        const $ = cheerio.load(result.text);
        expect($('h1').text()).to.equal('Hello world!');

        done();
      });
  });
});
