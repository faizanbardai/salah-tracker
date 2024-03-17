import { prisma } from "@/lib/prisma";

export async function getUserPrayers(start: string, end: string, email: string) {
  const startDate = new Date(start).toISOString();
  const endDate = new Date(end).toISOString();
  const userPrayers = await prisma.prayerDay.findMany({
    where: {
      User: { email },
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return userPrayers;
}
