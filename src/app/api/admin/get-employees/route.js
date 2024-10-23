import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  try {
    const employees = await prisma.usert.findMany({
      where: {
        userRole: "employee",
        OR: [{ blocked: null }, { blocked: { not: "Y" } }],
      },
    });

    return NextResponse.json({ result: employees }, { status: 200 });
  } catch (error) {
    console.error("Error during getting employees data:", error);
    return NextResponse.json(
      { error: "Failed to get employees data" },
      { status: 500 }
    );
  }
}
