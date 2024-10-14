-- CreateTable
CREATE TABLE "Usert" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userRole" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorDetail" TEXT,
    "authorImage" TEXT,
    "blocked" TEXT,

    CONSTRAINT "Usert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blogt" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "content" TEXT,
    "image" TEXT,
    "published" TEXT NOT NULL DEFAULT 'pending',
    "publishDate" TIMESTAMP(3) NOT NULL,
    "scheduledAt" TIMESTAMP(3),
    "delete_request" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER NOT NULL,
    "bloglive_id" INTEGER,
    "featuredpost" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Blogt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bloglivet" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "content" TEXT,
    "image" TEXT,
    "published" TEXT NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER NOT NULL,
    "featuredpost" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "delete_request" TEXT,

    CONSTRAINT "Bloglivet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favicont" (
    "id" SERIAL NOT NULL,
    "image" TEXT,

    CONSTRAINT "Favicont_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorialTopic" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" TEXT,
    "is_active" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "TutorialTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorialSubtopic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "slug" TEXT,
    "published" TEXT,
    "preference" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "delete_request" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subtopiclive_id" INTEGER,

    CONSTRAINT "TutorialSubtopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorialSubtopicLive" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "slug" TEXT,
    "published" TEXT,
    "preference" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "delete_request" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorialSubtopicLive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usert_email_key" ON "Usert"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usert_username_key" ON "Usert"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- AddForeignKey
ALTER TABLE "Blogt" ADD CONSTRAINT "Blogt_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Usert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blogt" ADD CONSTRAINT "Blogt_bloglive_id_fkey" FOREIGN KEY ("bloglive_id") REFERENCES "Bloglivet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blogt" ADD CONSTRAINT "Blogt_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bloglivet" ADD CONSTRAINT "Bloglivet_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Usert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bloglivet" ADD CONSTRAINT "Bloglivet_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorialTopic" ADD CONSTRAINT "TutorialTopic_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Usert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorialSubtopic" ADD CONSTRAINT "TutorialSubtopic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "TutorialTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorialSubtopicLive" ADD CONSTRAINT "TutorialSubtopicLive_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "TutorialTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
