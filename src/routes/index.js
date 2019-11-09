const fs = require('fs');
const { environment, host } = require('config');
const { Router } = require('express');

const { showProject, showHome, showPhotography, showAbout } = require('../controllers/frontend');
const { getAlbums } = require('../controllers/api');

// Only inline CSS for non-development builds (otherwise server has to restart to reflect changes)
const globalCSS = environment !== 'development' ? fs.readFileSync('./src/public/sass/global.css', 'utf-8') : false;

const setFrontendLocals = (req, res, next) => {
  res.locals.globalCSS = globalCSS;
  res.locals.baseURL = host;
  res.locals.pageURL = `${host}${req.originalUrl}`;

  next();
};

const router = Router();

router.get('/api/photos', getAlbums);

router.get('/', setFrontendLocals, showHome);
router.get('/projects/:project', setFrontendLocals, showProject);
router.get('/photography', setFrontendLocals, showPhotography);
router.get('/about', setFrontendLocals, showAbout);

module.exports = router;
