const { Router } = require('express');

const { renderMarkdown } = require('../helpers/markdown');

const router = Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/journal/:slug', (req, res) => {
  const data = renderMarkdown('./src/views/projects/test-project.md');

  res.render('journal-article', data);
});

module.exports = router;
