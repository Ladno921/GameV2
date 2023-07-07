/*
  Warnings:

  - You are about to alter the column `date` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `disk_space` on the `system_requirements` table. All the data in the column will be lost.
  - Added the required column `disc_space` to the `system_requirements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `system_requirements` DROP COLUMN `disk_space`,
    ADD COLUMN `disc_space` VARCHAR(255) NOT NULL;
