require('dotenv').config();

module.exports = {
  environment: process.env.NODE_ENV,
  port: 3000,
  host: process.env.NODE_HOST_URL,
};
