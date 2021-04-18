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

const app = express();

app.locals.resourceHashes = {
  globalCSS: hashFileContents(fs.readFileSync('./dist/public/styles/global.css', 'utf-8')),
  globalJS: hashFileContents(fs.readFileSync('./dist/public/scripts/global.js', 'utf-8')),
  homeCSS: hashFileContents(fs.readFileSync('./dist/public/styles/home.css', 'utf-8')),
  photographyCSS: hashFileContents(fs.readFileSync('./dist/public/styles/photography.css', 'utf-8')),
  photographyJS: hashFileContents(fs.readFileSync('./dist/public/scripts/photography.js', 'utf-8')),
  meCSS: hashFileContents(fs.readFileSync('./dist/public/styles/me.css', 'utf-8')),
};

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
