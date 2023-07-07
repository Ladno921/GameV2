/*
  Warnings:

  - You are about to alter the column `date` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `comments` MODIFY `date` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
