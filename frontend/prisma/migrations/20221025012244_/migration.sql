-- AlterTable
ALTER TABLE "image" ALTER COLUMN "published" SET DEFAULT false;

-- RenameIndex
ALTER INDEX "image_image_key" RENAME TO "image_url_key";
