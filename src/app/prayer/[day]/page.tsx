import { redirect } from "next/navigation";

// database
import { prisma } from "@/lib/prisma";

// auth
import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";

// Components
import PrayerViewTabs from "@/components/prayerView/PrayerViewTabs";

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
      date,
    },
  });
  if (existingPrayersForDay) return existingPrayersForDay;

  const userId = await getUserId(email);

  // create a new prayerDay
  const newPrayerDay = await prisma.prayerDay.create({
    data: {
      date,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return newPrayerDay;
}

async function getUserId(email: string) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) return existingUser.id;

  const newUser = await prisma.user.create({ data: { email } });
  return newUser.id;
}
