const { QUERYFILTER, PHOTOSORT } = require('../helpers/constants');
const errorHandler = require('../helpers/errorHandler');

const { Album } = require('../models/photography');

const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find()
      .populate({ path: 'photos', select: QUERYFILTER, options: { sort: PHOTOSORT } })
      .select(QUERYFILTER)
      .sort(PHOTOSORT);

    res.json(albums);
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

module.exports = {
  getAlbums,
};
