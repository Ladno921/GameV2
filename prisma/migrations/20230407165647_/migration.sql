/*
  Warnings:

  - You are about to alter the column `date` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `system_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `items` ADD COLUMN `system_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `system_requirements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CPU` VARCHAR(255) NOT NULL,
    `RAM` VARCHAR(255) NOT NULL,
    `video_card` VARCHAR(255) NOT NULL,
    `disk_space` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_system_id_fkey` FOREIGN KEY (`system_id`) REFERENCES `system_requirements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
