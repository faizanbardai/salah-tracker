import { prisma } from "@/lib/prisma";

export async function getUserPrayersForWeek(start: string, end: string, email: string) {
  const startOfWeek = new Date(start).toISOString();
  const endOfWeek = new Date(end).toISOString();
  const existingPrayersForWeek = await prisma.prayerDay.findMany({
    where: {
      user: { email },
      date: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return existingPrayersForWeek;
}
