/*
  Warnings:

  - You are about to drop the column `image` on the `image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `image` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE "image" RENAME COLUMN "image" to "url";
