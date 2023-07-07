/*
  Warnings:

  - You are about to alter the column `date` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `cat_id` on the `items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_cat_id_fkey`;

-- AlterTable
ALTER TABLE `comments` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `cat_id`;

-- CreateTable
CREATE TABLE `item_category` (
    `cat_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,

    PRIMARY KEY (`cat_id`, `item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `item_category` ADD CONSTRAINT `item_category_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_category` ADD CONSTRAINT `item_category_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
