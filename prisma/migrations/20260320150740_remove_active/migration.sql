/*
  Warnings:

  - You are about to drop the column `active` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Calendar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "active",
DROP COLUMN "updatedAt";
