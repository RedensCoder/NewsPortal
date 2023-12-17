/*
  Warnings:

  - Added the required column `link` to the `User_infos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `User_infos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User_infos" ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL;
