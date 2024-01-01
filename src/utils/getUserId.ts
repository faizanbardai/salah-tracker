import { prisma } from "@/lib/prisma";

export async function getUserId(email: string) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) return existingUser.id;

  const newUser = await prisma.user.create({ data: { email } });
  return newUser.id;
}
