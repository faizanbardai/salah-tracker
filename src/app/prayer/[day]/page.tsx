import { redirect } from "next/navigation";

// database
import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";

// auth
import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";

// Components
import PrayerViewTabs from "@/components/prayerView/PrayerViewTabs";

// Enums
import { PrayerStatus } from "@/enum/Prayers";

type PrayerDayProps = {
  params: { day: string };
};
export default async function PrayerDay({ params }: PrayerDayProps) {
  const date = params.day || new Date().toISOString().slice(0, 10);
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return redirect("/");
  }
  const email = session.user.email;
  const userPrayerDay = await getUserPrayersForDay(date, email);

  return <PrayerViewTabs date={params.day} userPrayerDay={userPrayerDay} />;
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
    date: date,
    userId: userId,
    fajr: PrayerStatus.NOT_PRAYED as $Enums.PrayerStatus,
    dhuhr: PrayerStatus.NOT_PRAYED as $Enums.PrayerStatus,
    asr: PrayerStatus.NOT_PRAYED as $Enums.PrayerStatus,
    maghrib: PrayerStatus.NOT_PRAYED as $Enums.PrayerStatus,
    isha: PrayerStatus.NOT_PRAYED as $Enums.PrayerStatus,
    tahajjud: PrayerStatus.NOT_PRAYED as $Enums.PrayerStatus,
  };
}

async function getUserId(email: string) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) return existingUser.id;

  const newUser = await prisma.user.create({ data: { email } });
  return newUser.id;
}
