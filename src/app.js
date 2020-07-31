const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const minifyHTML = require('express-minify-html');

const routes = require('./routes');

const app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  app.use(helmet());
  app.use(morgan('combined'));
}

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

app.locals.basePath = process.env.NODE_BASE_PATH || '/';

app.use('/public', express.static('./src/public'));

app.use(routes);

app.get('/robots.txt', (req, res) => res.type('text/plain').send('User-agent: *\nDisallow:'));

app.get('/status', (req, res) => res.sendStatus(200));

app.get('*', (req, res) => res.redirect(app.locals.basePath));

module.exports = app;
