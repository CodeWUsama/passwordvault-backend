import jwt from 'jsonwebtoken';
import RESPONSE_CODES from '../constants/responseCodes.js';
import sendResponse from '../helpers/responseHelper.js';

const authenticateToken = (req, res, next) => {
  const { token } = req.headers;

  if (token == null) return sendResponse(res, {}, 'Unauthorized user', RESPONSE_CODES.authorizationError);

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return sendResponse(res, {}, 'Unauthorized user', RESPONSE_CODES.authorizationError);
    req.userId = user.user;

    next();
  });
};

export default authenticateToken;
