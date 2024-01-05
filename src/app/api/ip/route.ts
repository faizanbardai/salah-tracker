import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/** @param {NextRequest} req */
export async function GET(req: NextRequest) {
  try {
    const headersList = headers();
    const ip_address = headersList.get("x-forwarded-for");
    console.log(headersList);
    const ip_address_hard_coded = "89.247.230.234";
    const locationAPI = await fetch(`http://ip-api.com/json/${ip_address_hard_coded}`, {
      referrerPolicy: "unsafe-url",
    });
    const locationData = await locationAPI.json();

    // https://api.aladhan.com/v1/timings/05-01-2024?latitude=48.1663&longitude=11.5683
    const date = new Date().toLocaleDateString("en-US").split("/").reverse().join("-");
    const prayerTimesURL = "https://api.aladhan.com/v1/timings/";
    let prayerTimes = await fetch(
      `${prayerTimesURL}${date}?latitude=${locationData.lat}&longitude=${locationData.lon}`
    );
    const prayerTimesData = await prayerTimes.json();

    const timings = prayerTimesData.data.timings;

    return NextResponse.json(timings);
  } catch (error) {
    return NextResponse.json({ Fajr: "", Dhuhr: "", message: error });
  }
}
