import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // Fetch all page content entries
    const pagecontent = await prisma.pageContent.findMany({});

    return NextResponse.json({ result: pagecontent }, { status: 200 });
  } catch (error) {
    console.error("Error during getting page content data:", error);
    return NextResponse.json(
      { error: "Failed to get page content data" },
      { status: 500 }
    );
  }
}
