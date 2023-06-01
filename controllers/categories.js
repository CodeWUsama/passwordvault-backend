import { PrismaClient } from '@prisma/client';
import sendResponse from '../helpers/responseHelper.js';

const prisma = new PrismaClient();

export const getAllCategories = async (req, res) => {
  const categories = await prisma.category.findMany({
    where: {
      CategoriesOnUsers: {
        some: {
          userId: req.userId,
        },
      },
    },
    include: {
      CategoriesOnUsers: true,
    },
    orderBy: {
      title: 'asc',
    },
  });
  sendResponse(res, categories);
};

export const createCategory = async (req, res) => {
  const { title } = req.body;
  const categoryAlreadyExists = await prisma.category.findFirst({
    where: {
      title: {
        equals: title,
        mode: 'insensitive',
      },
    },
  });
  if (categoryAlreadyExists) {
    const isUserPartOfCategory = await prisma.categoriesOnUsers.findFirst({
      where: {
        categoryId: categoryAlreadyExists.id,
        userId: req.userId,
      },
    });
    if (isUserPartOfCategory) {
      return sendResponse(res, {}, 'Category already exists');
    }
    await prisma.categoriesOnUsers.create({
      data: {
        categoryId: categoryAlreadyExists.id,
        userId: req.userId,
      },
    });
    return sendResponse(res);
  }
  await prisma.category.create({
    data: {
      title,
      CategoriesOnUsers: {
        connect: {
          userId: req.userId,
        },
      },
    },
  });
  sendResponse(res);
};
