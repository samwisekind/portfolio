import data from '../data/photography.json';

const getPhotographyData = () => ({
  albums: data.albums,
  photos: data.photos.sort((a, b) => a.order - b.order),
});

const getFeaturedPhotos = () => {
  const { photos } = getPhotographyData();

  const featuredPhotos = photos.filter((photo) => photo.featured);

  return featuredPhotos;
};

export {
  getPhotographyData,
  getFeaturedPhotos,
};
