const { Router } = require('express');

const { showIndex } = require('../controllers/frontend');

const router = Router();

router.get('/', showIndex);

module.exports = router;
