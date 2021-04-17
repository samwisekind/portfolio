import path from 'path';
import express from 'express';
import helmet from 'helmet';
// @ts-ignore
import morgan from 'morgan';
// @ts-ignore
import compression from 'compression';
// @ts-ignore
import minifyHTML from 'express-minify-html';

import { getPhotographyData, getFeaturedPhotos } from './helpers/photography';
import getWork from './helpers/me';

/* istanbul ignore next */
const environment = process.env.NODE_ENV || 'production';

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

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', async (_req, res) => {
  const photos = getFeaturedPhotos();
  return res.render('pages/home', { photos });
});

app.get('/photography', (_req, res) => {
  const data = getPhotographyData();
  res.render('pages/photography', data);
});

app.get('/me', (_req, res) => {
  const data = getWork();
  res.render('pages/me', data);
});

app.get('*', (_req, res) => res.redirect('/'));

/* istanbul ignore next */
if (environment !== 'test') {
  const port = 3000;
  app.use(morgan('combined'));
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`listening on port ${port}`));
}

export default app;
