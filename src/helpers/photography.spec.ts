import { getPhotographyData, getFeaturedPhotos } from './photography';

jest.mock('../data/photography.json', () => ({
  albums: [
    { name: 'Test Album 1', key: 'test-album-1' },
    { name: 'Test Album 2', key: 'test-album-2' },
  ],
  photos: [
    { title: 'foo', featured: false, order: 4 },
    { title: 'bar', featured: true, order: 2 },
    { title: 'hello', featured: false, order: 1 },
    { title: 'world', featured: true, order: 3 },
  ],
}), { virtual: true });

afterEach(() => {
  jest.clearAllMocks();
});

describe('getPhotos', () => {
  it('gets photography data', () => {
    const results = getPhotographyData();

    expect(results).toStrictEqual({
      albums: [
        { name: 'Test Album 1', key: 'test-album-1' },
        { name: 'Test Album 2', key: 'test-album-2' },
      ],
      photos: [
        { title: 'hello', featured: false, order: 1 },
        { title: 'bar', featured: true, order: 2 },
        { title: 'world', featured: true, order: 3 },
        { title: 'foo', featured: false, order: 4 },
      ],
    });
  });
});

describe('getFeaturedPhotos', () => {
  it('gets featured photos', () => {
    const results = getFeaturedPhotos();

    expect(results).toStrictEqual([
      { title: 'bar', featured: true, order: 2 },
      { title: 'world', featured: true, order: 3 },
    ]);
  });
});
