import { PrismaClient } from '@prisma/client';
import { encryptData } from '../helpers/encryptionHelpers.js';
import sendResponse from '../helpers/responseHelper.js';

const prisma = new PrismaClient();

const handleSignup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return sendResponse(res, null, 'User already exists');
    }

    const encryptedPassword = encryptData(password);
    await prisma.user.create({
      data: {
        fullname,
        email,
        password: encryptedPassword,
      },
    });
    return sendResponse(res);
  } catch (error) {
    return sendResponse(res, null, error.message);
  }
};

export default handleSignup;
