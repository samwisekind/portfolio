const fs = require('fs');
const YAML = require('yaml');

const { PHOTOGRAPHY_DATA_PATH } = require('./constants');

const getPhotos = () => {
  const data = fs.readFileSync(PHOTOGRAPHY_DATA_PATH, 'utf-8');
  const photos = YAML.parse(data).sort((a, b) => a.order - b.order);

  return photos;
};

const getFeaturedPhotos = () => {
  const featuredPhotos = getPhotos().filter((photo) => photo.featured);

  return featuredPhotos;
};

module.exports = { getPhotos, getFeaturedPhotos };
