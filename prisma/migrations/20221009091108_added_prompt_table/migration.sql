-- CreateTable
CREATE TABLE "prompt" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prompt_image_key" ON "prompt"("image");

-- AddForeignKey
ALTER TABLE "prompt" ADD CONSTRAINT "prompt_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
