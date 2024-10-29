/*
  Warnings:

  - Added the required column `altText` to the `SideImg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SideImg" ADD COLUMN     "altText" TEXT NOT NULL;
