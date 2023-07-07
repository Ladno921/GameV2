/*
  Warnings:

  - You are about to drop the `system_requirements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CPU` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RAM` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disc_space` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_card` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `CPU` VARCHAR(255) NOT NULL,
    ADD COLUMN `RAM` VARCHAR(255) NOT NULL,
    ADD COLUMN `disc_space` VARCHAR(255) NOT NULL,
    ADD COLUMN `video_card` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `system_requirements`;
