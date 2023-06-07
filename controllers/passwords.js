import { PrismaClient } from '@prisma/client';
import Cryptr from 'cryptr';
import sendResponse from '../helpers/responseHelper.js';
import createPasswordSchema from '../validationSchemas/passwordSchema.js';

const cryptr = new Cryptr(process.env.JWT_KEY);

const prisma = new PrismaClient();

export const handleGetPasswords = async (req, res) => {
  const passwords = await prisma.password.findMany();
  sendResponse(res, passwords);
};

export const handlePostPasswords = async (req, res) => {
  const { title, data, categoryId } = req.body;
  await createPasswordSchema.validate(req.body);
  const encryptedData = cryptr.encrypt(data);

  const password = await prisma.password.findFirst({
    where: {
      title,
      categoryId,
      userId: req.userId,
    },
  });

  if (password) {
    return sendResponse(res, {}, 'Password title already exists in this category. Please use unique title.');
  }

  await prisma.password.create({
    data: {
      title,
      data: encryptedData,
      user: {
        connect: {
          id: req.userId,
        },
      },
      category: {
        connect: { id: categoryId },
      },
    },
  });
  sendResponse(res, password);
};
