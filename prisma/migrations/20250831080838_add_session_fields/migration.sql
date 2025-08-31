-- AlterTable
ALTER TABLE `session` ADD COLUMN `accountOwner` BOOLEAN NULL,
    ADD COLUMN `collaborator` BOOLEAN NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `emailVerified` BOOLEAN NULL,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    ADD COLUMN `locale` VARCHAR(191) NULL;
