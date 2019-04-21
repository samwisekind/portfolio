const sanitize = require('mongo-sanitize');

const errorHandler = require('../helpers/errorHandler');

const { Project } = require('../models/project');

const showHome = async (req, res) => {
  try {
    const projects = await Project.find({ enabled: true })
      .sort('order');

    res.render('home', { projects });
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

const showProject = async (req, res) => {
  try {
    const { project } = req.params;

    const result = await Project.findOne({ key: sanitize(project) })
      .sort('order');

    if (!result) {
      throw new Error(404);
    }

    res.render(`projects/${project}`, result);
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
  showProject,
  showPhotography,
  showAbout,
};
