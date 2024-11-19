import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const featuredApp = await prisma.featuredApp.findMany();
    return NextResponse.json({ result: featuredApp }, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured app:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured app" },
      { status: 500 }
    );
  }
}
