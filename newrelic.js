const config = require('config');
const packageFile = require('./package.json');

exports.config = {
  app_name: [`${config.environment}_${packageFile.name}`],
  license_key: config.newRelicKey,
  logging: {
    level: 'info',
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*',
    ],
  },
  ignore: [
    '/status',
  ],
};
