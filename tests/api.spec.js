const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

const { mockedPhotos, mockedAlbums } = require('./mocks/photography');

describe('API', () => {
  it('Got correct photos and albums response content', async () => request(app)
    .get('/api/photos')
    .set('Accept', 'application/json')
    .then((result) => {
      const { status, type, body } = result;

      const [photo1, photo2, photo3, photo4] = mockedPhotos.map(
        ({ title, thumbnailURL, imageURL }) => ({ title, thumbnailURL, imageURL }),
      );
      const [album2, album1] = mockedAlbums;

      expect(status).to.equal(200);
      expect(type).to.equal('application/json');
      expect(body).to.deep.equal({
        [album1.key]: {
          title: album1.title,
          photos: [photo4, photo1],
        },
        [album2.key]: {
          title: album2.title,
          photos: [photo3, photo1, photo2],
        },
      });
    }));
});
