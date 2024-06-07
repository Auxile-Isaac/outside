/*
  Warnings:

  - Added the required column `name` to the `Coordinates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coordinates" ADD COLUMN     "name" TEXT NOT NULL;
