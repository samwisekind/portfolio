const http = require('http');
const https = require('https');
const fs = require('fs');

const { port } = require('config');
const { name } = require('./package.json');
const database = require('./src/helpers/mongodb');
const app = require('./src/app');

database.open();

const server = http.createServer(app);
server.listen(port);
server.on('listening', () => console.log(`${name} listening on port ${port}`));

if (process.env === 'production') {
  const serverSSL = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/archive/flamov.com/privkey1.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/archive/flamov.com/fullchain1.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/archive/flamov.com/chain1.pem'),
  }, app);
  serverSSL.listen(443);
  serverSSL.on('listening', () => console.log(`${name} listening on port 443`));
}
