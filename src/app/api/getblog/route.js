import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { slug } = body;

    console.log("slug", slug);

    let blog;

    blog = await prisma.blogt.findFirst({ where: { slug } });

    console.log("outside blog", blog);

    if (!blog) {
      blog = await prisma.bloglivet.findFirst({ where: { slug } });
      console.log("inside blog", blog);
    }

    console.log("last blog", blog);

    return NextResponse.json({ result: blog }, { status: 200 });
  } catch (error) {
    console.error("Error during blog fetching:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
