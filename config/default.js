require('dotenv').config();

module.exports = {
  environment: process.env.NODE_ENV,
  port: 3000,
  host: process.env.NODE_HOST_URL,
  mongodb: {
    URL: process.env.NODE_MONGODB_URL,
    replicaSet: process.env.NODE_MONGO_RS,
    authSource: process.env.NODE_MONGODB_AUTH_SOURCE,
    options: {
      user: process.env.NODE_MONGODB_USER,
      pass: process.env.NODE_MONGODB_PASS,
      useNewUrlParser: true,
    },
  },
};
