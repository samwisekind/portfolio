const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');
const { Photo, Album } = require('../src/models/photography');
const { mockedPhotos, mockedAlbums } = require('./mocks/photography');

let database;

before(async () => {
  database = new MongoMemoryServer();
  await mongoose.connect(await database.getConnectionString(), { useNewUrlParser: true });

  await Promise.all([
    Photo.collection.insertMany(mockedPhotos),
    Album.collection.insertMany(mockedAlbums),
  ]);
});

after(() => {
  mongoose.disconnect();
  database.stop();
});

describe('API', () => {
  it('Got correct photos and albums response content', async () => request(app)
    .get('/api/photos')
    .set('Accept', 'application/json')
    .then((result) => {
      const { status, type, body } = result;

      expect(status).to.equal(200);
      expect(type).to.equal('application/json');
      expect(body).to.deep.equal([
        {
          title: 'Test Album 1',
          photos: [
            { title: 'Test Photo 2', thumbnailURL: '', imageURL: '' },
            { title: 'Test Photo 4', thumbnailURL: '', imageURL: '' },
          ],
        },
        {
          title: 'Test Album 2',
          photos: [
            { title: 'Test Photo 1', thumbnailURL: '', imageURL: '' },
            { title: 'Test Photo 3', thumbnailURL: '', imageURL: '' },
            { title: 'Test Photo 4', thumbnailURL: '', imageURL: '' },
          ],
        },
      ]);
    }));
});
