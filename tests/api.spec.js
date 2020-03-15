const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');

const app = require('../src/app');

const { Photo, Album } = require('../src/models/photography');
const { mockedPhotos, mockedAlbums } = require('./mocks/photography');

let database;

beforeAll(async () => {
  database = new MongoMemoryServer();
  await mongoose.connect(await database.getConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Promise.all([
    Photo.collection.insertMany(mockedPhotos),
    Album.collection.insertMany(mockedAlbums),
  ]);
});

afterAll(() => {
  mongoose.disconnect();
  database.stop();
});


describe('API', () => {
  it('Got correct photos and albums response content', async (done) => {
    const result = await request(app)
      .get('/api/photos')
      .set('Accept', 'application/json');

    const { status, type, body } = result;

    const [photo1, photo2, photo3, photo4] = mockedPhotos.map(
      ({ title, thumbnailURL, imageURL }) => ({ title, thumbnailURL, imageURL }),
    );
    const [album2, album1] = mockedAlbums;

    expect(status).toBe(200);
    expect(type).toBe('application/json');
    expect(body).toEqual({
      [album1.key]: {
        title: album1.title,
        photos: [photo4, photo1],
      },
      [album2.key]: {
        title: album2.title,
        photos: [photo3, photo1, photo2],
      },
    });

    done();
  });
});
