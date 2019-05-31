const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { Project } = require('../src/models/project');
const { Photo, Album } = require('../src/models/photography');

const { mockedProjects } = require('./mocks/projects');
const { mockedPhotos, mockedAlbums } = require('./mocks/photography');

let database;

before(async () => {
  database = new MongoMemoryServer();
  await mongoose.connect(await database.getConnectionString(), { useNewUrlParser: true });

  await Promise.all([
    Project.collection.insertMany(mockedProjects),
    Photo.collection.insertMany(mockedPhotos),
    Album.collection.insertMany(mockedAlbums),
  ]);
});

after(() => {
  mongoose.disconnect();
  database.stop();
});
