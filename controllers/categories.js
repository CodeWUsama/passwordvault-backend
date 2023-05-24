import { PrismaClient } from '@prisma/client';
import sendResponse from '../helpers/responseHelper.js';

const prisma = new PrismaClient();

export const handleGetCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        CategoriesOnUsers: {
          where: {
            userId: req.userId,
          },
        },
      },
    });
    sendResponse(res, categories);
  } catch (err) {
    sendResponse(res, {}, err.message);
  }
};

export const handlePostCategory = async (req, res) => {
  const { title } = req.body;
  try {
    await prisma.category.create({
      data: {
        title,
        CategoriesOnUsers: {
          create: {
            userId: req.userId,
          },
        },
      },
    });
    sendResponse(res);
  } catch (err) {
    sendResponse(res, {}, err.message);
  }
};
