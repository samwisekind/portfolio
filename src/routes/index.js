const { Router } = require('express');

const { getJournalArticlesList } = require('../helpers/journal');

const router = Router();

router.get('/', (req, res) => {
  const articles = getJournalArticlesList().slice(0, 2);
  res.render('home', { articles });
});

router.get('/journal', (req, res) => {
  const articles = getJournalArticlesList();
  res.render('journal', { articles });
});

router.get('/journal/:slug', (req, res) => {
  const article = getJournalArticlesList().find((item) => item.slug === req.params.slug);
  res.render('journal-detail', article);
});

module.exports = router;
