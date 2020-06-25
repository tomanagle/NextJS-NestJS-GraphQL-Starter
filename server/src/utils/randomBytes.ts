import crypto from 'crypto';

function randomBytes(size = 48) {
  return crypto
    .randomBytes(size)
    .toString('hex')
    .slice(0, size);
}

export default randomBytes;
