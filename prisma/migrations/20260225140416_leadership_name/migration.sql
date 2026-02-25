/*
  Warnings:

  - Added the required column `confirmed_leader` to the `Attendee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendee" ADD COLUMN     "confirmed_leader" TEXT NOT NULL;
