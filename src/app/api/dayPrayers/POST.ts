import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";

export default async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !req.body) {
    return NextResponse.error();
  }
  const { date, prayer, status } = await req.json();

  const dateTime = new Date(date).toISOString();

  const existingRecord = await prisma.prayerDay.findFirst({
    where: {
      date: dateTime,
      User: { email: session.user.email },
    },
  });

  if (!existingRecord) {
    return NextResponse.error();
  }
  const updatedRecord = await prisma.prayerDay.update({
    where: {
      id: existingRecord.id,
    },
    data: {
      [prayer]: status,
    },
  });
  return NextResponse.json(updatedRecord);
}
