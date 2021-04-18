export const mockedPhotos = {
  albums: [
    {
      name: 'Test Album 1',
      key: 'test-album-1',
    },
    {
      name: 'Test Album 2',
      key: 'test-album-2',
    },
  ],
  photos: [
    {
      order: 0,
      title: 'photo 1 title',
      alt: 'photo 1 alt',
      location: 'photo 1 location',
      album: 'test-album-1',
      date: '2010',
      src: {
        jpg: 'photo-1-src.jpg',
        webp: 'photo-1-src.webp',
      },
      size: {
        width: 100,
        height: 200,
      },
    },
    {
      order: 1,
      title: 'photo 2 title',
      alt: 'photo 2 alt',
      location: 'photo 2 location',
      album: 'test-album-1',
      date: '2020',
      src: {
        jpg: 'photo-2-src.jpg',
      },
      size: {
        width: 400,
        height: 300,
      },
    },
    {
      order: 2,
      title: 'photo 3 title',
      alt: 'photo 3 alt',
      location: 'photo 3 location',
      album: 'test-album-2',
      date: '2030',
      src: {
        jpg: 'photo-3-src.jpg',
        webp: 'photo-3-src.webp',
      },
      size: {
        width: 500,
        height: 500,
      },
    },
    {
      order: 3,
      title: 'photo 4 title',
      alt: 'photo 4 alt',
      location: 'photo 4 location',
      album: 'test-album-2',
      date: '2040',
      src: {
        jpg: 'photo-4-src.jpg',
        webp: 'photo-4-src.webp',
      },
      size: {
        width: 600,
        height: 600,
      },
    },
  ],
};

export const mockedAlbums = [
  {
    order: 0,
    title: 'photo 1 title',
    alt: 'photo 1 alt',
    location: 'photo 1 location',
    album: 'test-album-1',
    date: '2010',
    src: {
      jpg: 'photo-1-src.jpg',
      webp: 'photo-1-src.webp',
    },
    size: {
      width: 100,
      height: 200,
    },
  },
  {
    order: 1,
    title: 'photo 2 title',
    alt: 'photo 2 alt',
    location: 'photo 2 location',
    album: 'test-album-2',
    date: '2020',
    src: {
      jpg: 'photo-2-src.jpg',
    },
    size: {
      width: 400,
      height: 300,
    },
  },
];