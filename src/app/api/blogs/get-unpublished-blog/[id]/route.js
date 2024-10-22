import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const unpublishedBlog = await prisma.blogt.findUnique({
      where: { id: Number(id) },
    });

    if (!unpublishedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(unpublishedBlog);
  } catch (error) {
    console.error("Error fetching unpublishedBlog:", error);
    return NextResponse.json(
      { message: "Failed to fetch cateunpublishedBloggory" },
      { status: 500 }
    );
  }
}
