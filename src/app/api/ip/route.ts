import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/** @param {NextRequest} req */
export async function GET(req: NextRequest) {
  const headersList = headers();
  const ip_address = headersList.get("x-forwarded-for");
  const res = await fetch(`http://ip-api.com/json/${ip_address}`);
  const data = await res.json();
  return NextResponse.json(data);
}
