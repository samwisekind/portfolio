import path from 'path';
import fs from 'fs';
import express from 'express';
import helmet from 'helmet';
// @ts-ignore
import morgan from 'morgan';
// @ts-ignore
import compression from 'compression';
// @ts-ignore
import minifyHTML from 'express-minify-html';

import hashFileContents from './helpers/hash';
import { getPhotographyData, getFeaturedPhotos } from './helpers/photography';
import getWork from './helpers/me';

/* istanbul ignore next */
const environment = process.env.NODE_ENV || 'production';

const resourceHashes = [
  { name: 'globalCSSHash', file: './dist/public/styles/global.css' },
  { name: 'globalJSHash', file: './dist/public/scripts/global.js' },
  { name: 'homeCSSHash', file: './dist/public/styles/home.css' },
  { name: 'photographyCSSHash', file: './dist/public/styles/photography.css' },
  { name: 'photographyJSHash', file: './dist/public/scripts/photography.js' },
  { name: 'meCSSHash', file: './dist/public/styles/me.css' },
].reduce((accumulator, { name, file }) => ({
  ...accumulator,
  [name]: environment !== 'development' ? hashFileContents(fs.readFileSync(file, 'utf-8')) : '',
}), {});

const app = express();

app.use(helmet());
app.use(compression());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(minifyHTML({
  override: true,
  htmlMinifier: {
    collapseWhitespace: true,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true,
  },
}));

app.get('/status', (_req, res) => res.sendStatus(200));

app.get('/robots.txt', (_req, res) => res.type('text/plain').send('User-agent: *\nDisallow:'));

app.use('/public', express.static('./dist/public'));

app.use((_req, res, next) => {
  app.locals.resourceHashes = resourceHashes;
  res.set('Content-Security-Policy', 'img-src \'self\' https://cdn.flamov.com data:;');
  next();
});

app.get('/', async (_req, res) => res.render('pages/home', {
  data: getFeaturedPhotos(),
}));

app.get('/photography', (_req, res) => res.render('pages/photography', {
  data: getPhotographyData(),
}));

app.get('/me', (_req, res) => res.render('pages/me', {
  data: getWork(),
}));

app.get('*', (_req, res) => res.redirect('/'));

/* istanbul ignore next */
if (environment !== 'test') {
  const port = 3000;
  app.use(morgan('combined'));
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`listening on port ${port}`));
}

export default app;
