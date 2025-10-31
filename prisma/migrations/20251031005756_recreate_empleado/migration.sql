/*
  Warnings:

  - Added the required column `apellido` to the `Empleado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empleado` ADD COLUMN `apellido` VARCHAR(191) NOT NULL,
    ADD COLUMN `puesto` VARCHAR(191) NULL,
    ADD COLUMN `telefono` VARCHAR(191) NULL;
