const fs = require('fs');
const yaml = require('yaml');

const { WORK_DATA_PATH } = require('./constants');

const getWork = () => {
  const data = fs.readFileSync(WORK_DATA_PATH, 'utf-8');
  const work = yaml.parse(data);

  return work;
};

module.exports = { getWork };
