const { Router } = require('express');

const {
  showHome,
  showJournalList,
  showJournalArticle,
  showPhotography,
  showWork,
} = require('../controllers');

const router = Router();

router.get('/', showHome);
router.get('/journal', showJournalList);
router.get('/journal/:slug', showJournalArticle);
router.get('/photography', showPhotography);
router.get('/work', showWork);

module.exports = router;
