/*
  Warnings:

  - You are about to alter the column `date` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `comments` MODIFY `date` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `category_items` (
    `cat__id` INTEGER NOT NULL,
    `item__id` INTEGER NOT NULL,

    PRIMARY KEY (`cat__id`, `item__id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category_items` ADD CONSTRAINT `category_items_cat__id_fkey` FOREIGN KEY (`cat__id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_items` ADD CONSTRAINT `category_items_item__id_fkey` FOREIGN KEY (`item__id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
