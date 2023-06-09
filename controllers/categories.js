import { PrismaClient } from '@prisma/client';
import Cryptr from 'cryptr';
import sendResponse from '../helpers/responseHelper.js';

const cryptr = new Cryptr(process.env.JWT_KEY);

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
  const category = await prisma.categoriesOnUsers.create({
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
    select: {
      category: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  sendResponse(res, category);
};

export const getCategoryPasswords = async (req, res) => {
  const categoryId = req.params.id;
  const passwords = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      password: true,
    },
  });
  const updatedPasswords = passwords.password.map((pass) => ({
    ...pass,
    data: btoa(cryptr.decrypt(pass.data)),
  }));
  sendResponse(res, updatedPasswords);
};
