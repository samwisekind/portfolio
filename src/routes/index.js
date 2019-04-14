const { Router } = require('express');

const { showPhotography, showAbout } = require('../controllers/frontend');
const { getAlbums } = require('../controllers/api');

const router = Router();

router.get('/api/photos', getAlbums);

router.get('/photography', showPhotography);
router.get('/about', showAbout);

module.exports = router;
