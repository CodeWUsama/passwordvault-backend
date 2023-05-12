import { PrismaClient } from '@prisma/client';
import sendResponse from '../helpers/responseHelper.js';

const prisma = new PrismaClient();

export const handleSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    sendResponse(res);
  } catch (error) {
    sendResponse(res, null, error.message);
  }
};
