-- CreateTable
CREATE TABLE "PageContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "content" TEXT,
    "published" TEXT NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "PageContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PageContent" ADD CONSTRAINT "PageContent_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Usert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
