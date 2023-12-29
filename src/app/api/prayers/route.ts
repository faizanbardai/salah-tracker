import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !req.body) {
    return NextResponse.error();
  }
  const { date, prayer, status } = await req.json();
  const prayerDay = await prisma.prayerDay.findFirst({
    where: {
      date: date,
      user: { email: session.user.email },
    },
  });
  if (!prayerDay) {
    return NextResponse.error();
  }
  const prayerDayUpdate = await prisma.prayerDay.update({
    where: {
      id: prayerDay.id,
    },
    data: {
      [prayer]: status,
    },
  });

  return NextResponse.json(prayerDayUpdate);
}
