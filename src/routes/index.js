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

const fs = require('fs');
const YAML = require('yaml');

router.get('/photography', (req, res) => {
  const photos = YAML.parse(fs.readFileSync('./src/data/photography.yaml', 'utf-8'))
    .sort((a, b) => a.order - b.order);

  console.log('photos', photos);
  res.render('photography', { photos });
});

module.exports = router;
