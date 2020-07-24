const fs = require('fs');

const { getJournalArticleData } = require('./journal');

beforeEach(() => {
  const readFileSyncMock = jest.spyOn(fs, 'readFileSync');
  readFileSyncMock.mockImplementation(() => '---\nfoo: bar\nhello: world\n---\n# Lorem ipsum\nDolor sit amet');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getJournalArticleData', () => {
  it('gets journal article data', () => {
    const results = getJournalArticleData('test-journal-article-file.md');

    expect(results).toStrictEqual({
      slug: 'test-journal-article-file',
      attributes: {
        foo: 'bar',
        hello: 'world',
      },
      content: '<h1 id="lorem-ipsum">Lorem ipsum</h1>\n<p>Dolor sit amet</p>',
    });
  });
});
