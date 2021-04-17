const app = require('./dist/app').default;

const port = 3000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`listening on port ${port}`));
