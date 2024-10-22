/*
  Warnings:

  - Added the required column `isActive` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialMedia" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
