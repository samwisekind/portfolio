import data from '../data/photography.json';

const getPhotographyData = () => ({
  albums: data.albums,
  photos: [...data.photos].sort((a, b) => a.order - b.order),
});

const getFeaturedPhotos = () => {
  const { photos } = getPhotographyData();

  return photos.filter((photo) => photo.featured);
};

export {
  getPhotographyData,
  getFeaturedPhotos,
};
