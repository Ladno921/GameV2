/*
  Warnings:

  - You are about to drop the column `nickName` on the `comments` table. All the data in the column will be lost.
  - Added the required column `name` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `nickName`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;
