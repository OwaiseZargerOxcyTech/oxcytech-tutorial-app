import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  try {
    const users = await prisma.usert.findMany({
      where: {
        OR: [{ blocked: null }, { blocked: { not: "Y" } }],
      },
    });

    return NextResponse.json({ result: users }, { status: 200 });
  } catch (error) {
    console.error("Error during getting users data:", error);
    return NextResponse.json(
      { error: "Failed to get users data" },
      { status: 500 }
    );
  }
}
