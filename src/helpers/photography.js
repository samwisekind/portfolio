const fs = require('fs');
const YAML = require('yaml');

const getPhotos = () => {
  const data = fs.readFileSync('./src/data/photography.yaml', 'utf-8');
  const photos = YAML.parse(data).sort((a, b) => a.order - b.order);

  return photos;
};

const getFeaturedPhotos = () => {
  const featuredPhotos = getPhotos().filter((photo) => photo.featured);

  return featuredPhotos;
};

module.exports = { getPhotos, getFeaturedPhotos };
