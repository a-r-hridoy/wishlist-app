/*
  Warnings:

  - A unique constraint covering the columns `[shop]` on the table `settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `settings` ADD COLUMN `shop` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `settings_shop_key` ON `settings`(`shop`);
