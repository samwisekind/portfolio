const fs = require('fs');
const yaml = require('yaml');

const { WORK_DATA_PATH } = require('./constants');

const getWork = () => {
  const data = fs.readFileSync(WORK_DATA_PATH, 'utf-8');
  const me = yaml.parse(data);

  return me;
};

module.exports = { getWork };
