-- CreateTable
CREATE TABLE `logins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL DEFAULT '123456',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `logins_email_key`(`email`),
    INDEX `logins_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `loginId` INTEGER NOT NULL,
    `superUser` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_uuid_key`(`uuid`),
    UNIQUE INDEX `users_loginId_key`(`loginId`),
    INDEX `users_name_uuid_idx`(`name`, `uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_loginId_fkey` FOREIGN KEY (`loginId`) REFERENCES `logins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
