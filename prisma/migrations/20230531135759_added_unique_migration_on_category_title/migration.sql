/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "migartion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "migartion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "migartion_title_key" ON "migartion"("title");

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");
