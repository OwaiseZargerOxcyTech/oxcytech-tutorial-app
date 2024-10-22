/*
  Warnings:

  - Added the required column `link` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialMedia" ADD COLUMN     "link" TEXT NOT NULL;
