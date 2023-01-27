import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

const jwtConf:object = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (user:object) => {
  const token = jwt.sign({ data: user }, secret, jwtConf);
  return token;
};

const verifyToken = (authorization:string) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    return { status: 401, message: 'Invalid Token' };
  }
};

export default createToken;
export { verifyToken };
