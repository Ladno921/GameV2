/*
  Warnings:

  - Added the required column `DirectX` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OS` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developer` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `DirectX` VARCHAR(255) NOT NULL,
    ADD COLUMN `OS` VARCHAR(255) NOT NULL,
    ADD COLUMN `developer` VARCHAR(255) NOT NULL,
    ADD COLUMN `platform` VARCHAR(255) NOT NULL,
    ADD COLUMN `release` VARCHAR(255) NOT NULL;
