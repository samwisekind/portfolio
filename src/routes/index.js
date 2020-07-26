const { Router } = require('express');

const { JOURNAL_FEATURED_LIMIT } = require('../helpers/constants');
const { getJournalArticlesList } = require('../helpers/journal');
const { getPhotos, getFeaturedPhotos } = require('../helpers/photography');
const { getWork } = require('../helpers/work');

const router = Router();

router.get('/', async (req, res) => {
  const articles = await getJournalArticlesList(JOURNAL_FEATURED_LIMIT);
  const photos = getFeaturedPhotos();

  return res.render('pages/home', { articles, photos });
});

router.get('/journal', async (req, res) => {
  const articles = await getJournalArticlesList();

  res.render('pages/journal', { articles });
});

router.get('/journal/:slug', async (req, res) => {
  let article = await getJournalArticlesList();
  article = article.find((item) => item.slug === req.params.slug);

  res.render('pages/journal-detail', article);
});

router.get('/photography', (req, res) => {
  const photos = getPhotos();

  res.render('pages/photography', { photos });
});

router.get('/work', (req, res) => {
  const data = getWork();
  res.render('pages/work', data);
});

module.exports = router;
