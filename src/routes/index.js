const { Router } = require('express');

const { JOURNAL_FEATURED_LIMIT } = require('../helpers/constants');

const { getJournalArticlesList } = require('../helpers/journal');
const { getPhotos, getFeaturedPhotos } = require('../helpers/photography');

const router = Router();

router.get('/', (req, res) => {
  const articles = getJournalArticlesList(JOURNAL_FEATURED_LIMIT);
  const photos = getFeaturedPhotos();

  res.render('home', { articles, photos });
});

router.get('/journal', (req, res) => {
  const articles = getJournalArticlesList();

  res.render('journal', { articles });
});

router.get('/journal/:slug', (req, res) => {
  const article = getJournalArticlesList().find((item) => item.slug === req.params.slug);

  res.render('journal-detail', article);
});

router.get('/photography', (req, res) => {
  const photos = getPhotos();

  res.render('photography', { photos });
});

router.get('/work', (req, res) => {
  res.render('work');
});

module.exports = router;
