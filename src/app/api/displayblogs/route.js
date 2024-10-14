

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const blogs = await prisma.$queryRaw`
      SELECT 
        combined.id,
        combined.title,
        combined.description,
        combined.content,
        combined.image,
        combined.slug,
        combined.published,
        combined.delete_request,
        combined.author_id,
        combined.bloglive_id,
        combined.featuredpost,
        combined."publishDate",
        u."authorName" AS "authorName",
        c."name" AS "categoryName"
      FROM (
        SELECT
          b.id,
          b.title,
          b.description,
          b.content,
          b.image,
          b.slug,
          b.published,
          b.delete_request,
          b.author_id,
          b.bloglive_id,
          b.featuredpost,
          b."publishDate",
          b."category_id"
        FROM public."Blogt" b

        UNION ALL

        SELECT
          bl.id,
          bl.title,
          bl.description,
          bl.content,
          bl.image,
          bl.slug,
          bl.published,
          bl.delete_request,
          bl.author_id,
          null AS bloglive_id,
          bl.featuredpost,
          bl."publishDate",
          bl."category_id"
        FROM public."Bloglivet" bl
        LEFT JOIN public."Blogt" b ON bl.id = b.bloglive_id
        WHERE b.bloglive_id IS NULL
      ) AS combined
      LEFT JOIN public."Usert" u ON combined.author_id = u.id
      LEFT JOIN public."Category" c ON combined.category_id = c.id
      ORDER BY combined.title;
    `;
    

    // Optionally, add status field based on bloglive_id
    const blogData = blogs.map(blog => ({
      ...blog,
      status: blog.bloglive_id ? "published" : "pending",
    }));
    // console.log("Processed Blog Data:", blogData); 

    return NextResponse.json({ result: blogData }, { status: 200 });
  } catch (error) {
    console.error("Error during getting blogs data:", error);
    return NextResponse.json(
      { error: "Failed to get blogs data" },
      { status: 500 }
    );
  }
}
