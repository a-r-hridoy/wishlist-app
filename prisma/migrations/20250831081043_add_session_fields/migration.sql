-- AlterTable
ALTER TABLE `session` ALTER COLUMN `isOnline` DROP DEFAULT,
    MODIFY `accessToken` VARCHAR(191) NULL;
