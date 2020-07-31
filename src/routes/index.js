const { Router } = require('express');

const { JOURNAL_FEATURED_LIMIT } = require('../helpers/constants');
const { getJournalArticlesList } = require('../helpers/writing');
const { getPhotos, getFeaturedPhotos } = require('../helpers/photography');
const { getWork } = require('../helpers/work');

const router = Router();

router.get('/', async (req, res) => {
  const articles = await getJournalArticlesList(JOURNAL_FEATURED_LIMIT);
  const photos = getFeaturedPhotos();

  return res.render('pages/home', { articles, photos });
});

router.get('/writing', async (req, res) => {
  const articles = await getJournalArticlesList();

  res.render('pages/writing', { articles });
});

router.get('/writing/:slug', async (req, res) => {
  let article = await getJournalArticlesList();
  article = article.find((item) => item.slug === req.params.slug);

  res.render('pages/writing-detail', article);
});

router.get('/photography', (req, res) => {
  const data = getPhotos();

  res.render('pages/photography', data);
});

router.get('/work', (req, res) => {
  const data = getWork();
  res.render('pages/work', data);
});

module.exports = router;
