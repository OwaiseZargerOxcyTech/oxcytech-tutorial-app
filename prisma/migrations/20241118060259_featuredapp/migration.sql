-- CreateTable
CREATE TABLE "FeaturedApp" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "FeaturedApp_pkey" PRIMARY KEY ("id")
);
