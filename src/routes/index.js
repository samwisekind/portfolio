const fs = require('fs');
const { Router } = require('express');

const marked = require('marked');
const frontmatter = require('front-matter');

const { renderMarkdown } = require('../helpers/markdown');

const router = Router();

router.get('/', (req, res) => {
  const dir = './src/data/journal';
  const articles = fs.readdirSync(dir).map((file) => {
    const data = fs.readFileSync(`${dir}/${file}`, 'utf-8');

    const { attributes } = frontmatter(data);

    return attributes;
  });

  res.render('home', { articles });
});

router.get('/journal', (req, res) => {
  res.render('journal');
});

router.get('/journal/:slug', (req, res) => {
  const dir = './src/data/journal';
  const result = fs.readdirSync(dir).map((file) => {
    const data = fs.readFileSync(`${dir}/${file}`, 'utf-8');

    const { text } = marked.lexer(data).find((item) => item.type === 'heading' && item.depth === 1);

    const { attributes } = frontmatter(data);

    return {
      file,
      title: text,
      slug: attributes.slug,
    };
  }).find((item) => item.slug === req.params.slug);

  const data = renderMarkdown(`${dir}/${result.file}`);

  res.render('journal-detail', data);
});

module.exports = router;
