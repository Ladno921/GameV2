-- CreateTable
CREATE TABLE `basket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `description` VARCHAR(2000) NOT NULL,
    `release` VARCHAR(255) NOT NULL,
    `developer` VARCHAR(255) NOT NULL,
    `platform` VARCHAR(255) NOT NULL,
    `OS` VARCHAR(255) NOT NULL,
    `CPU` VARCHAR(255) NOT NULL,
    `RAM` VARCHAR(255) NOT NULL,
    `video_card` VARCHAR(255) NOT NULL,
    `DirectX` VARCHAR(255) NOT NULL,
    `disc_space` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
