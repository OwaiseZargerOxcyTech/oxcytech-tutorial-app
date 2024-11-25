import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

// GET Handler: Fetch Blogs by Category or Single Blog by Slug
export async function GET(req) {
  const url = new URL(req.url);
  const pageSlug = url.searchParams.get("footerSlug");

  try {
    if (pageSlug) {
      const pageContent = await prisma.pageContent.findMany({
        where: {
          slug: pageSlug,
        },
      });

      return NextResponse.json({ result: pageContent }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching page content:", error);
    return NextResponse.json(
      { error: "Failed to get page content" },
      { status: 500 }
    );
  }
}
