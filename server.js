const { name } = require('./package.json');
const app = require('./src/app');

const port = 3000;

app.listen(port, () => console.log(`${name} listening on port ${port}`));
