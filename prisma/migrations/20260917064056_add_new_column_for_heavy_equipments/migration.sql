/*
  Warnings:

  - Added the required column `description` to the `heavy_equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `heavy_equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "heavy_equipment" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;
