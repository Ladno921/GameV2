/*
  Warnings:

  - Added the required column `system_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `system_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `system_requirements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CPU` VARCHAR(255) NOT NULL,
    `RAM` VARCHAR(255) NOT NULL,
    `video_card` VARCHAR(255) NOT NULL,
    `disc_space` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_system_id_fkey` FOREIGN KEY (`system_id`) REFERENCES `system_requirements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
