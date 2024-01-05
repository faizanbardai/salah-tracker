import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/** @param {NextRequest} req */
export async function GET(req: NextRequest) {
  const headersList = headers();

  const data = {
    ip_address: headersList.get("x-forwarded-for"),
    user_agent: headersList.get("user-agent"),
  };

  return NextResponse.json(data);
}
