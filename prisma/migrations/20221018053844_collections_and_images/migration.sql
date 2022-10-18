/*
  Warnings:

  - You are about to drop the column `image` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `prompt` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `image` table. All the data in the column will be lost.
  - Added the required column `collectionId` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_ownerId_fkey";

-- DropIndex
DROP INDEX "collection_image_key";

-- AlterTable
ALTER TABLE "collection" DROP COLUMN "image",
DROP COLUMN "prompt",
ALTER COLUMN "name" SET DEFAULT 'Untitled';

-- AlterTable
ALTER TABLE "image" DROP COLUMN "ownerId",
ADD COLUMN     "collectionId" TEXT NOT NULL,
ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
