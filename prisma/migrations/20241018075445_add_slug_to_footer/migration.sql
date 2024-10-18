/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Footer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isActive` to the `Footer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Footer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Footer" ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Footer_slug_key" ON "Footer"("slug");
