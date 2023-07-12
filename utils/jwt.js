import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'not here';

export function signJWT(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1y',
  });
}

export function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}
