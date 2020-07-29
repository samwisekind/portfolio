const fs = require('fs');
const yaml = require('yaml');

const { PHOTOGRAPHY_DATA_PATH } = require('./constants');

const getPhotos = () => {
  const data = fs.readFileSync(PHOTOGRAPHY_DATA_PATH, 'utf-8');

  const results = yaml.parse(data);

  return {
    photos: results.photos.sort((a, b) => a.order - b.order),
    albums: results.albums,
  };
};

const getFeaturedPhotos = () => {
  const { photos } = getPhotos();

  const featuredPhotos = photos.filter((photo) => photo.featured);

  return featuredPhotos;
};

module.exports = { getPhotos, getFeaturedPhotos };
