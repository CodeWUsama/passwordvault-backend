import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteDuplicatedCategories = async () => {
  const duplicatedCategories = await prisma.category.groupBy({
    by: ['title'],
    having: {
      title: {
        _count: {
          gt: 1,
        },
      },
    },
  });
  duplicatedCategories.forEach(async (duplicatedCategory) => {
    const categoryItems = await prisma.category.findMany({
      where: {
        title: duplicatedCategory.title,
      },
    });
    await prisma.categoriesOnUsers.deleteMany({
      where: {
        category: { title: duplicatedCategory.title },
      },
    });
    await prisma.category.deleteMany({
      where: {
        id: {
          in: categoryItems.filter((_, index) => index !== 0).map(({ id }) => id),
        },
      },
    });
  });
};

export default deleteDuplicatedCategories;
