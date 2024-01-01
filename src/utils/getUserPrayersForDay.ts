import { prisma } from "@/lib/prisma";
import { getUserId } from "@/utils/getUserId";

export async function getUserPrayersForDay(date: string, email: string) {
  const dateTime = new Date(date).toISOString();
  const existingPrayersForDay = await prisma.prayerDay.findFirst({
    where: {
      user: { email },
      date: dateTime,
    },
  });
  if (existingPrayersForDay) return existingPrayersForDay;

  const userId = await getUserId(email);

  const newRecord = await prisma.prayerDay.create({
    data: {
      date: dateTime,
      user: { connect: { id: userId } },
    },
  });

  return newRecord;
}
