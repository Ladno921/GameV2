/*
  Warnings:

  - You are about to alter the column `date` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `category_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `category_items` DROP FOREIGN KEY `category_items_cat__id_fkey`;

-- DropForeignKey
ALTER TABLE `category_items` DROP FOREIGN KEY `category_items_item__id_fkey`;

-- AlterTable
ALTER TABLE `comments` MODIFY `date` DATETIME NOT NULL;

-- DropTable
DROP TABLE `category_items`;
