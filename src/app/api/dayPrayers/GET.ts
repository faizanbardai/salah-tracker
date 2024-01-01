import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";
import { getUserPrayersForDay } from "@/utils/getUserPrayersForDay";

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
