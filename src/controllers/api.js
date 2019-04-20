const { QUERYFILTER } = require('../helpers/constants');
const errorHandler = require('../helpers/errorHandler');

const { Album } = require('../models/photography');

const getAlbums = async (req, res) => {
  try {
    let albums = await Album.find()
      .populate({ path: 'photos', select: QUERYFILTER })
      .select(QUERYFILTER)
      .sort('order');

    albums = albums.reduce((accumulator, { key, title, photos }) => ({
      ...accumulator,
      [key]: { title, photos },
    }), {});

    res.json(albums);
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

module.exports = {
  getAlbums,
};
