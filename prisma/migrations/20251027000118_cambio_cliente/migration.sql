/*
  Warnings:

  - Added the required column `createdAt` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `estado` BOOLEAN NOT NULL,
    ADD COLUMN `telefono` VARCHAR(191) NOT NULL;
