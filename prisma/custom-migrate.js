import { PrismaClient } from '@prisma/client';
import registerMigration from '../helpers/migrationHelpers.js';
import deleteDuplicatedCategories from './custom-migrations/delete_duplicated_categories.js';

const prisma = new PrismaClient();

async function migrate() {
  await registerMigration('deleteDuplicatedCategories', deleteDuplicatedCategories);
}

migrate()
  .then(async () => {
    console.log('Migrations Successful');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log('Migrations Failed: ', error);
    await prisma.$disconnect();
    process.exit(1);
  });
