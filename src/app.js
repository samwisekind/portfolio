const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const minifyHTML = require('express-minify-html');

const routes = require('./routes');

/* istanbul ignore next */
const environment = process.env.NODE_ENV || 'production';

const app = express();

/* istanbul ignore next */
if (environment !== 'test') {
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

app.get('/status', (req, res) => res.sendStatus(200));

app.get('/robots.txt', (req, res) => res.type('text/plain').send('User-agent: *\nDisallow:'));

app.use('/public', express.static('./src/public'));

app.use(routes);

app.get('*', (req, res) => res.redirect('/'));

module.exports = app;
