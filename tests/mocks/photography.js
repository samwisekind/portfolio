/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

const mockedPhotos = [
  {
    title: 'Test Photo 1',
    thumbnailURL: '',
    imageURL: '',
  },
  {
    title: 'Test Photo 2',
    thumbnailURL: '',
    imageURL: '',
  },
  {
    title: 'Test Photo 3',
    thumbnailURL: '',
    imageURL: '',
  },
  {
    title: 'Test Photo 4',
    thumbnailURL: '',
    imageURL: '',
  },
].map((photo) => ({ ...photo, _id: mongoose.Types.ObjectId() }));

const mockedAlbums = [
  {
    order: 2,
    key: 'test-album-2',
    title: 'Test Album 2',
    photos: [
      mongoose.Types.ObjectId(mockedPhotos[2]._id),
      mongoose.Types.ObjectId(mockedPhotos[0]._id),
      mongoose.Types.ObjectId(mockedPhotos[1]._id),
    ],
  },
  {
    order: 1,
    key: 'test-album-1',
    title: 'Test Album 1',
    photos: [
      mongoose.Types.ObjectId(mockedPhotos[3]._id),
      mongoose.Types.ObjectId(mockedPhotos[0]._id),
    ],
  },
];

module.exports = { mockedPhotos, mockedAlbums };
