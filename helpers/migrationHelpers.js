import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const registerMigration = async (title, cb) => {
  const migrationData = await prisma.migration.findUnique({
    where: {
      title,
    },
  });
  if (migrationData) return;
  await prisma.migration.create({
    data: {
      title,
    },
  });
  cb();
};

export default registerMigration;
