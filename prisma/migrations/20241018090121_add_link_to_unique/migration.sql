/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `SocialMedia` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_link_key" ON "SocialMedia"("link");
