/*
  Warnings:

  - Added the required column `categoriaId` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `libro` ADD COLUMN `categoriaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `prestamo` ADD COLUMN `devuelto` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `empleadoId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Empleado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Empleado_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devolucion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prestamoId` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observacion` VARCHAR(191) NULL,

    UNIQUE INDEX `Devolucion_prestamoId_key`(`prestamoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Libro` ADD CONSTRAINT `Libro_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestamo` ADD CONSTRAINT `Prestamo_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Devolucion` ADD CONSTRAINT `Devolucion_prestamoId_fkey` FOREIGN KEY (`prestamoId`) REFERENCES `Prestamo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
