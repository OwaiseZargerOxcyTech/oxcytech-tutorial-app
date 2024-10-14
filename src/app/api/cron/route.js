// app/api/cron/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const now = new Date();

  try {
    // Fetch scheduled blogs that are due to be published
    const blogsToPublish = await prisma.blogt.findMany({
      where: {
        published: "scheduled",
        scheduledAt: {
          lte: now,
        },
      },
    });

    // Loop through each blog and move it to the published state
    for (const blog of blogsToPublish) {
      try {
        // Create a new entry in the bloglivet model
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

        // Delete the blog from the blogt model after publishing
        await prisma.blogt.delete({ where: { id: blog.id } });
      } catch (error) {
        console.error(`Error creating/deleting blog: ${blog.id}`, error);
      }
    }

    return NextResponse.json({ message: 'Cron job executed successfully', count: blogsToPublish.length });
  } catch (error) {
    console.error("Error fetching blogs to publish:", error);
    return NextResponse.json({ message: 'Error fetching blogs to publish', error: error.message }, { status: 500 });
  }
}
