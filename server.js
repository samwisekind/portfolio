const http = require('http');
const https = require('https');
const fs = require('fs');

const { port, certificatePath } = require('config');
const { name } = require('./package.json');
const database = require('./src/helpers/mongodb');
const app = require('./src/app');

database.open();

http.createServer(app).listen(port).on('listening', () => console.log(`${name} listening on port ${port}`));

if (process.env.NODE_ENV === 'production') {
  https.createServer({
    key: fs.readFileSync(`${certificatePath}/privkey1.pem`),
    cert: fs.readFileSync(`${certificatePath}/fullchain1.pem`),
    ca: fs.readFileSync(`${certificatePath}/chain1.pem`),
  }, app).listen(443).on('listening', () => console.log(`${name} listening on port 443`));
}
