const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  enabled: Boolean,
  order: Number,
  key: String,
  title: String,
  description: String,
  technologies: Array,
  responsibilities: String,
  websiteURL: String,
  previewVideo: String,
  previewImage: String,
  started: Date,
  ended: Date,
}, { collection: 'projects' });

const Project = mongoose.model('project', projectSchema);

module.exports = { Project };
