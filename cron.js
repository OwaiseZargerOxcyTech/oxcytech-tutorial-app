const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

cron.schedule("*/5 * * * *", async () => {
  const now = new Date();

  try {
    const blogsToPublish = await prisma.blogt.findMany({
      where: {
        published: "scheduled",
        scheduledAt: {
          lte: now,
        },
      },
    });

    for (const blog of blogsToPublish) {
      try {
        await prisma.bloglivet.create({
          data: {
            title: blog.title,
            description: blog.description,
            content: blog.content,
            image: blog.image,
            publishDate: blog.publishDate,
            slug: blog.slug,
            published: "Y",
            delete_request: blog.delete_request,
            author: {
              connect: { id: blog.author_id },
            },
            featuredpost: blog.featuredpost,
            category: {
              connect: { id: blog.category_id },
            },
          },
        });
        await prisma.blogt.delete({ where: { id: blog.id } });
      } catch (error) {
        console.error(`Error creating/deleting blog: ${blog.id}`, error);
      }
    }
  } catch (error) {
    console.error("Error fetching blogs to publish:", error);
  }
});
console.log("cron is running");
