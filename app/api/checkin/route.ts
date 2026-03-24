
export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let dateParam = searchParams.get("date");

  if (!dateParam) {
    dateParam = new Date().toISOString();
  }

  const date = new Date(dateParam);

  if (isNaN(date.getTime())) {
    return NextResponse.json({
      error: "Invalid date format",
    }, { status: 401 });
  }

  const startOfDay = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));

  const endOfDay = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 1
  ));

  const attendees = await prisma.attendee.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      }
    },
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

export async function PUT(req: Request) {
  const { confirmed, notConfirmed } = await req.json();

}