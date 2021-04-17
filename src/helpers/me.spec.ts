import getWork from './me';

jest.mock('../data/me.json', () => ({
  projects: [
    { title: 'foo', description: 'bar' },
    { title: 'biz', description: 'baz' },
  ],
  recognitions: [
    { title: 'hello', date: '1st January 2000' },
  ],
}), { virtual: true });

afterEach(() => {
  jest.clearAllMocks();
});

describe('getWork', () => {
  it('gets work data', () => {
    const results = getWork();

    expect(results).toStrictEqual({
      projects: [
        { title: 'foo', description: 'bar' },
        { title: 'biz', description: 'baz' },
      ],
      recognitions: [
        { title: 'hello', date: '1st January 2000' },
      ],
    });
  });
});
