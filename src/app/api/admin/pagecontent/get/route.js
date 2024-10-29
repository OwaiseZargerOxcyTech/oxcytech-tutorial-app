import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { pageContentItemID } = body;

    let pageContentItemData = await prisma.pageContent.findUnique({
      where: { id: parseInt(pageContentItemID) },
    });

    return NextResponse.json({ result: pageContentItemData }, { status: 200 });
  } catch (error) {
    console.error("Error during fetching page content:", error);
    return NextResponse.json(
      { error: "Failed to fetch page content" },
      { status: 500 }
    );
  }
}
