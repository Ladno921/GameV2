/*
  Warnings:

  - Added the required column `item_id` to the `system_requirements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_system_id_fkey`;

-- AlterTable
ALTER TABLE `system_requirements` ADD COLUMN `item_id` INTEGER NOT NULL;
