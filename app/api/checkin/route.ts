
export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const attendees = await prisma.attendee.findMany({
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(attendees);
}

export async function POST(req: Request) {  
    const { name } = await req.json();    
  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  const attendee = await prisma.attendee.create({
    data: { name },
  });

  return NextResponse.json(attendee);
}
