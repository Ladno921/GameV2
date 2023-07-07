/*
  Warnings:

  - Added the required column `nickName` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` ADD COLUMN `nickName` VARCHAR(255) NOT NULL;
