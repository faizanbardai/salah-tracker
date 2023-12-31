import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";
import { PrayerStatus } from "@prisma/client";

export default async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.error();
  }

  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.error();
  }

  const userPrayerDay = await getUserPrayersForDay(date, session.user.email);

  return NextResponse.json(userPrayerDay);
}

async function getUserId(email: string) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) return existingUser.id;

  const newUser = await prisma.user.create({ data: { email } });
  return newUser.id;
}

async function getUserPrayersForDay(date: string, email: string) {
  const existingPrayersForDay = await prisma.prayerDay.findFirst({
    where: {
      user: {
        email,
      },
      date: new Date(date).toISOString(),
    },
  });
  if (existingPrayersForDay) return existingPrayersForDay;

  const userId = await getUserId(email);

  return {
    id: "",
    date: new Date(date).toISOString(),
    userId: userId,
    fajr: PrayerStatus.NOT_PRAYED,
    dhuhr: PrayerStatus.NOT_PRAYED,
    asr: PrayerStatus.NOT_PRAYED,
    maghrib: PrayerStatus.NOT_PRAYED,
    isha: PrayerStatus.NOT_PRAYED,
    tahajjud: PrayerStatus.NOT_PRAYED,
  };
}
