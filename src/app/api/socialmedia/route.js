import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET Handler: Fetch All Accounts
export async function GET() {
  try {
    const accounts = await prisma.socialMedia.findMany();
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error("Error fetching account:", error);
    return NextResponse.json(
      { error: "Failed to fetch account" },
      { status: 500 }
    );
  }
}

// POST Handler: Add New Accounts
export async function POST(request) {
  try {
    const { name, isActive, link, icon } = await request.json();

    if (!name || !link) {
      return NextResponse.json(
        { error: "Name, link and slug are required" },
        { status: 400 }
      );
    }

    const existingaccount = await prisma.socialMedia.findUnique({
      where: { link },
    });

    if (existingaccount) {
      return NextResponse.json(
        { error: "account with this link already exists" },
        { status: 400 }
      );
    }

    // Create new accounts
    const newAccount = await prisma.socialMedia.create({
      data: {
        name,
        link,
        icon,
        isActive,
      },
    });

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    console.error("Error adding account:", error);
    return NextResponse.json(
      { error: "Failed to add account" },
      { status: 500 }
    );
  }
}
