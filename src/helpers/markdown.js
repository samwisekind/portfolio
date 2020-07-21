const fs = require('fs');
const marked = require('marked');
const frontmatter = require('front-matter');
const highlightjs = require('highlight.js');

marked.setOptions({
  highlight: (code, language) => highlightjs.highlight(
    highlightjs.getLanguage(language) ? language : 'plaintext',
    code,
  ).value,
});

/**
 * Parses and renders markdown file, returning front-matter and body
 * @param {String} path Path to markdown file
 */
const renderMarkdown = (path) => {
  const file = fs.readFileSync(path, 'utf-8');

  const { attributes, body } = frontmatter(file);
  const content = marked(body);

  return { attributes, content };
};

module.exports = { renderMarkdown };
