import { PrismaClient } from '@prisma/client';
import CATEGORIES from '../constants/categories.js';

const prisma = new PrismaClient();

async function seed() {
  const categories = await prisma.category.findMany();
  if (categories.length === 0) {
    await prisma.category.createMany({
      data: CATEGORIES,
    });
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
