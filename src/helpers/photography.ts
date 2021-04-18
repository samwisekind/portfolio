import data from '../data/photography.json';

const getPhotographyData = () => {
  const sortedPhotos = data.photos.sort((a, b) => a.order - b.order);

  return {
    albums: data.albums,
    photos: sortedPhotos,
  };
};

const getFeaturedPhotos = () => {
  const { photos } = getPhotographyData();

  return photos.filter((photo) => photo.featured);
};

export {
  getPhotographyData,
  getFeaturedPhotos,
};
