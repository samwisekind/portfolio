const { name } = require('./package.json');
const app = require('./src/app');

const port = 3000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`${name} listening on port ${port}`));
