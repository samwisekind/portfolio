const mongoose = require('mongoose');

const { mongodb: { URL, options } } = require('config');

const open = () => new Promise((resolve, reject) => {
  mongoose.connect(URL, options, error => (error ? reject(error) : resolve()));
});

const close = () => mongoose.disconnect();

mongoose.connection.on('connected', () => console.info('Mongoose default connection opened'));

mongoose.connection.on('reconnected', () => console.info('Mongoose default connection re-opened'));

mongoose.connection.on('error', error => console.error(`Mongoose default connection error: ${error}`));

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected: attempting re-connect');
  setTimeout(open, 5000); // Attempt reconnection
});

// On app restart/reload/stop
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = { open, close };
