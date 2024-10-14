import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { blogID, published } = body;
    let blog;

    if (published === "Y") {
      blog = await prisma.bloglivet.findUnique({
        where: { id: parseInt(blogID) },
      });
    } else {
      blog = await prisma.blogt.findUnique({ where: { id: parseInt(blogID) } });
    }

    return NextResponse.json({ result: blog }, { status: 200 });
  } catch (error) {
    console.error("Error during fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
