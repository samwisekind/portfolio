const { Router } = require('express');

const { showPhotography } = require('../controllers/frontend');
const { getAlbums } = require('../controllers/api');

const router = Router();

router.get('/api/photos', getAlbums);

router.get('/photography', showPhotography);

module.exports = router;
