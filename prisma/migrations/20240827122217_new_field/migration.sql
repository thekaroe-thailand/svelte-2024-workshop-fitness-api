/*
  Warnings:

  - Added the required column `price` to the `CourseAndMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseAndMember" ADD COLUMN     "price" INTEGER NOT NULL;
