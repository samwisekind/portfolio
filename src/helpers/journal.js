const fs = require('fs');
const path = require('path');
const glob = require('glob');
const marked = require('marked');
const frontmatter = require('front-matter');
const highlightjs = require('highlight.js');

const { JOURNAL_DATA_DIRECTORY } = require('./constants');

marked.setOptions({
  highlight: (code, language) => highlightjs.highlight(
    highlightjs.getLanguage(language) ? language : 'plaintext',
    code,
  ).value,
});

/**
 * Returns object of articles with file, body, attributes, title, description, and slug
 * @param {string} file File path to parse
 */
const getJournalArticleData = (file) => {
  // Infer slug from the file name without extension
  const slug = path.basename(file, path.extname(file));

  const data = fs.readFileSync(file, 'utf-8');

  // Get body and front-matter attributes
  const { body, attributes } = frontmatter(data);

  // Render markdown from the body
  const content = marked(body).trim();

  return { slug, attributes, content };
};

/**
 * Returns object of articles with slug, title, description
 * @param {number=} limit Number of articles to return or returns all articles if omitted
 */
const getJournalArticlesList = async (limit) => {
  const results = await glob.sync(JOURNAL_DATA_DIRECTORY)
    .map((file) => getJournalArticleData(file))
    .sort((a, b) => Date.parse(b.attributes.published) - Date.parse(a.attributes.published));

  if (limit) {
    return results.slice(0, limit);
  }

  return results;
};

module.exports = { getJournalArticleData, getJournalArticlesList };
