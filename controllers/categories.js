import { PrismaClient } from '@prisma/client';
import sendResponse from '../helpers/responseHelper.js';

const prisma = new PrismaClient();

export const getAllCategories = async (req, res) => {
  console.log(
    await prisma.category.findMany({
      include: {
        CategoriesOnUsers: true,
      },
    })
  );
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
  const isUserPartOfCategory = await prisma.category.findFirst({
    where: {
      title: {
        equals: title,
        mode: 'insensitive',
      },
      CategoriesOnUsers: {
        some: {
          userId: req.userId,
        },
      },
    },
  });
  if (isUserPartOfCategory) {
    return sendResponse(res, {}, 'Category already exists');
  }
  await prisma.categoriesOnUsers.create({
    data: {
      user: {
        connect: {
          id: req.userId,
        },
      },
      category: {
        connectOrCreate: {
          where: {
            title,
          },
          create: {
            title,
          },
        },
      },
    },
  });
  sendResponse(res);
};
