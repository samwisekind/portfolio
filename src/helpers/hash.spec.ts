import hashFileContents from './hash';

describe('hashFileContents', () => {
  it('Returns 361fadf1c712e812d198c4cab5712a79 when contents is HELLO WORLD', () => {
    const generateCacheHash = hashFileContents('HELLO WORLD');
    expect(generateCacheHash).toBe('361fadf1c712e812d198c4cab5712a79');
  });
});
