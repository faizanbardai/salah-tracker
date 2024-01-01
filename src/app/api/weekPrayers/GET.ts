import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";
import { getUserId } from "@/utils/getUserId";
import { PrayerStatus } from "@/enum/Prayers";
import { getUserPrayersForWeek } from "../../../utils/getUserPrayersForWeek";

export default async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.error();
  }

  const searchParams = req.nextUrl.searchParams;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.error();
  }

  const userPrayerWeek = await getUserPrayersForWeek(start, end, session.user.email);

  return NextResponse.json(userPrayerWeek);
}
