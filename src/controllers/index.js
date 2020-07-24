const { JOURNAL_FEATURED_LIMIT } = require('../helpers/constants');
const { getJournalArticlesList } = require('../helpers/journal');
const { getPhotos, getFeaturedPhotos } = require('../helpers/photography');

const showHome = (req, res) => {
  const articles = getJournalArticlesList(JOURNAL_FEATURED_LIMIT);
  const photos = getFeaturedPhotos();

  return res.render('pages/home', { articles, photos });
};

const showJournalList = (req, res) => {
  const articles = getJournalArticlesList();

  res.render('pages/journal', { articles });
};

const showJournalArticle = (req, res) => {
  const article = getJournalArticlesList().find((item) => item.slug === req.params.slug);

  res.render('pages/journal-detail', article);
};

const showPhotography = (req, res) => {
  const photos = getPhotos();

  res.render('pages/photography', { photos });
};

const showWork = (req, res) => res.render('pages/work');

module.exports = {
  showHome,
  showJournalList,
  showJournalArticle,
  showPhotography,
  showWork,
};
