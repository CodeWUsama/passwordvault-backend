import { PrismaClient } from '@prisma/client';
import sendResponse from '../helpers/responseHelper.js';
import createPasswordSchema from '../validationSchemas/passwordSchema.js';

const prisma = new PrismaClient();

export const handleGetPasswords = async (req, res) => {
  try {
    const passwords = await prisma.password.findMany();
    sendResponse(res, passwords);
  } catch (err) {
    sendResponse(res, {}, err.message);
  }
};

export const handlePostPasswords = async (req, res) => {
  const { title, data, categoryId } = req.body;
  try {
    await createPasswordSchema.validate(req.body);

    await prisma.password.create({
      data: {
        title,
        data,
        category: {
          connect: { id: categoryId },
        },
      },
    });
    sendResponse(res);
  } catch (err) {
    sendResponse(res, {}, err.message);
  }
};
