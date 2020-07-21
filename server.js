const { port } = require('config');
const { name } = require('./package.json');
const app = require('./src/app');

app.listen(port, () => console.log(`${name} listening on port ${port}`));
