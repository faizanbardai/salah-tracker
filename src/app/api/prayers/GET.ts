import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";

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
  const dateTime = new Date(date).toISOString();
  const existingPrayersForDay = await prisma.prayerDay.findFirst({
    where: {
      user: { email },
      date: dateTime,
    },
  });
  if (existingPrayersForDay) return existingPrayersForDay;

  const userId = await getUserId(email);

  const newRecord = await prisma.prayerDay.create({
    data: {
      date: dateTime,
      user: { connect: { id: userId } },
    },
  });

  return newRecord;
}
