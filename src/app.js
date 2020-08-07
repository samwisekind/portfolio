const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const minifyHTML = require('express-minify-html');

const { version } = require('../package.json');

const routes = require('./routes');

const environment = process.env.NODE_ENV || 'production';

const app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'jest') {
  app.use(morgan('combined'));
}

app.use(helmet());

app.use(compression());
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(minifyHTML({
  override: true,
  htmlMinifier: {
    collapseWhitespace: true,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true,
  },
}));

app.use('/public', express.static('./src/public'));

app.use(routes);

app.get('/robots.txt', (req, res) => {
  let robots = 'User-agent: *\nDisallow:';
  if (environment === 'test') {
    robots = 'User-agent: *\nDisallow: /';
  }

  res.type('text/plain').send(robots);
});

app.get('/version', (req, res) => res.json({
  version,
  environment,
  viewCache: app.get('view cache'),
}));

app.get('/status', (req, res) => res.sendStatus(200));

app.get('*', (req, res) => res.redirect('/'));

module.exports = app;
