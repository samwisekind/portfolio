const { Router } = require('express');

const { showIndex } = require('../controllers/frontend');
const { getAlbums } = require('../controllers/api');

const router = Router();

router.get('/', showIndex);

router.get('/api/photos', getAlbums);

module.exports = router;
