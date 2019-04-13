require('dotenv').config();

module.exports = {
  environment: process.env.NODE_ENV,
  port: 3000,
  mongodb: {
    URL: process.env.NODE_MONGODB_URL,
    options: {
      user: process.env.NODE_MONGODB_USER,
      pass: process.env.NODE_MONGODB_PASS,
      useNewUrlParser: true,
    },
  },
};
