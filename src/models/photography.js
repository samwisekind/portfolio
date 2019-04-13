const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  order: Number,
  title: String,
  thumbnailURL: String,
  imageURL: String,
}, { collection: 'photos' });

const Photo = mongoose.model('photo', PhotoSchema);

const AlbumSchema = new mongoose.Schema({
  order: Number,
  title: String,
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: Photo }],
}, { collection: 'albums' });

const Album = mongoose.model('album', AlbumSchema);

module.exports = { Photo, Album };
