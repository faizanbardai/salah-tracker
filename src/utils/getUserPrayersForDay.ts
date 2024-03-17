import { prisma } from "@/lib/prisma";
import { getUserId } from "@/utils/getUserId";

export async function getUserPrayersForDay(date: string, email: string) {
  const dateTime = new Date(date).toISOString();

  const userId = await getUserId(email);
  const existingPrayersForDay = await prisma.prayerDay.findFirst({
    where: {
      date: dateTime,
      userId: userId,
    },
  });
  if (existingPrayersForDay) return existingPrayersForDay;

  const newRecord = await prisma.prayerDay.create({
    data: {
      date: dateTime,
      userId: userId,
    },
  });

  return newRecord;
}
