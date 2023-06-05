/*
  Warnings:

  - You are about to drop the `migartion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "migartion";

-- CreateTable
CREATE TABLE "migration" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "migration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "migration_title_key" ON "migration"("title");
