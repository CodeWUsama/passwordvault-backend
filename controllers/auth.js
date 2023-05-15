import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import RESPONSE_CODES from '../constants/responseCodes.js';
import { compareData } from '../helpers/encryptionHelpers.js';
import sendResponse from '../helpers/responseHelper.js';

const prisma = new PrismaClient();

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const isAuth = compareData(password, user.password);
      if (isAuth) {
        const token = jwt.sign({ email }, process.env.JWT_KEY);
        return sendResponse(res, { auth_token: token });
      }
    }
    return sendResponse(res, null, 'Invalid email/password', RESPONSE_CODES.authorizationError);
  } catch (error) {
    return sendResponse(res, null, error.message);
  }
};

export default handleLogin;
