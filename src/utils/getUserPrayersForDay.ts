import { prisma } from "@/lib/prisma";
import { getUserId } from "@/utils/getUserId";

export async function getUserPrayersForDay(date: string, email: string) {
  const dateTime = new Date(date).toISOString();

  const userId = await getUserId(email);
  const existingPrayersForDay = await prisma.prayerDay.findUnique({
    where: {
      userId_date: {
        userId: userId,
        date: dateTime,
      },
    },
  });
  if (existingPrayersForDay) return existingPrayersForDay;

  const newRecord = await prisma.prayerDay.create({
    data: {
      date: dateTime,
      user: { connect: { id: userId } },
    },
  });

  return newRecord;
}
