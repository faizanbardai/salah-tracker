import { authOptions } from "@/service/auth/authOptions";
import { getUserPrayersForDay } from "@/utils/getUserPrayersForDay";
import { getServerSession } from "next-auth/next";
import { NextResponse, type NextRequest } from "next/server";

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
