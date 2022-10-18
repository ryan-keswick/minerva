/*
  Warnings:

  - You are about to drop the `prompt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "prompt" DROP CONSTRAINT "prompt_authorId_fkey";

-- DropTable
DROP TABLE "prompt";

-- CreateTable
CREATE TABLE "collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collection_image_key" ON "collection"("image");

-- CreateIndex
CREATE UNIQUE INDEX "image_image_key" ON "image"("image");

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
