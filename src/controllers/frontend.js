const errorHandler = require('../helpers/errorHandler');

const showPhotography = async (req, res) => {
  try {
    res.render('photography');
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

const showAbout = async (req, res) => {
  try {
    res.render('about');
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

module.exports = {
  showPhotography,
  showAbout,
};
