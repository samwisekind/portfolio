/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

const mockedPhotos = [
  {
    order: 3,
    title: 'Test Photo 4',
    thumbnailURL: '',
    imageURL: '',
  },
  {
    order: 1,
    title: 'Test Photo 2',
    thumbnailURL: '',
    imageURL: '',
  },
  {
    order: 2,
    title: 'Test Photo 3',
    thumbnailURL: '',
    imageURL: '',
  },
  {
    order: 0,
    title: 'Test Photo 1',
    thumbnailURL: '',
    imageURL: '',
  },
].map(photo => ({ ...photo, _id: mongoose.Types.ObjectId() }));

const mockedAlbums = [
  {
    order: 2,
    title: 'Test Album 2',
    photos: [
      mongoose.Types.ObjectId(mockedPhotos[3]._id),
      mongoose.Types.ObjectId(mockedPhotos[2]._id),
      mongoose.Types.ObjectId(mockedPhotos[0]._id),
    ],
  },
  {
    order: 1,
    title: 'Test Album 1',
    photos: [
      mongoose.Types.ObjectId(mockedPhotos[1]._id),
      mongoose.Types.ObjectId(mockedPhotos[0]._id),
    ],
  },
];

module.exports = { mockedPhotos, mockedAlbums };
