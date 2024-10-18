import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handling GET request for a specific Account
export async function GET(request, { params }) {
  const { id } = params; 
  try {
    const account = await prisma.socialMedia.findUnique({
      where: { id: Number(id) }, 
    });
    
    if (!account) {
      return NextResponse.json({ error: 'account not found' }, { status: 404 });
    }

    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch account' }, { status: 500 });
  }
}

// Handling DELETE request for a specific account
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.socialMedia.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(
      { message: "account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const { name, link, icon, isActive } = await req.json();
    
    const updatedAccount = await prisma.socialMedia.update({
      where: { id: parseInt(id) },
      data: { name, link, icon, isActive },
    });
    return NextResponse.json(updatedAccount, { status: 200 });
  } catch (error) {
    console.error("Error updating account:", error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  try {
    const { isActive } = await req.json();
    const updatedFooter = await prisma.footer.update({
      where: { id: parseInt(id) },
      data: { isActive },
    });
    // fetchActiveAccounts();
    return NextResponse.json(updatedFooter, { status: 200 });
  } catch (error) {
    console.error("Error updating account status:", error);
    return NextResponse.json(
      { error: "Failed to update account status" },
      { status: 500 }
    );
  }
}
