/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `clerkId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `user`;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_clerkId_key` ON `Usuario`(`clerkId`);
