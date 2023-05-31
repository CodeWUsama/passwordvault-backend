import { PrismaClient } from '@prisma/client';
import sendResponse from '../helpers/responseHelper.js';

const prisma = new PrismaClient();

export const getAllCategories = async (req, res) => {
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
};

export const createCategory = async (req, res) => {
  const { title } = req.body;
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
};
