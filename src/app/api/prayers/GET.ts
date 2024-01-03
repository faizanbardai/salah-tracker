import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";
import { getUserPrayers } from "@/utils/getUserPrayers";

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

  const userPrayers = await getUserPrayers(start, end, session.user.email);

  return NextResponse.json(userPrayers);
}
