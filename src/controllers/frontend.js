const { QUERYFILTER } = require('../helpers/constants');
const errorHandler = require('../helpers/errorHandler');

const { Project } = require('../models/project');

const showHome = async (req, res) => {
  try {
    const projects = await Project.find({ enabled: true })
      .select(QUERYFILTER)
      .sort('order');

    res.render('home', { projects });
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

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
  showHome,
  showPhotography,
  showAbout,
};
