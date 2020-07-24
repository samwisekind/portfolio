const { Router } = require('express');

const { getJournalArticlesList } = require('../helpers/journal');
const { getPhotos, getFeaturedPhotos } = require('../helpers/photography');

const router = Router();

router.get('/', (req, res) => {
  const articles = getJournalArticlesList().slice(0, 2);
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

module.exports = router;
