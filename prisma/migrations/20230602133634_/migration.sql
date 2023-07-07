/*
  Warnings:

  - You are about to drop the column `comment` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `comments` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `text` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `comment`,
    DROP COLUMN `rating`,
    ADD COLUMN `text` VARCHAR(255) NOT NULL,
    MODIFY `date` DATETIME NOT NULL;
