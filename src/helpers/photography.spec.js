jest.mock('fs');

const fs = require('fs');

const { getPhotos } = require('./photography');
const { expectCt } = require('helmet');

beforeEach(() => {
  fs.readFileSync.mockImplementation(() => `
    - title: foo
      order: 4
    - title: bar
      order: 2
    - title: hello
      order: 1
    - title: world
      order: 3
  `);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getPhotos', () => {
  it('gets photos', () => {
    const results = getPhotos();

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith('./src/data/photography.yaml', 'utf-8');

    expect(results).toStrictEqual([
      { title: 'hello', order: 1 },
      { title: 'bar', order: 2 },
      { title: 'world', order: 3 },
      { title: 'foo', order: 4 },
    ]);
  });
});
