const { Router } = require('express');

const { showProject, showHome, showPhotography, showAbout } = require('../controllers/frontend');
const { getAlbums } = require('../controllers/api');

const router = Router();

router.get('/api/photos', getAlbums);

router.get('/', showHome);
router.get('/projects/:project', showProject);
router.get('/photography', showPhotography);
router.get('/about', showAbout);


module.exports = router;
