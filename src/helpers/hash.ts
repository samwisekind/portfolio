import crypto from 'crypto';

const hashFileContents = (
  contents: string,
) => {
  const hash = crypto.createHash('md5');
  return hash.update(contents).digest('hex');
};

export default hashFileContents;
