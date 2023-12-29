"use client";
import redirectToCurrentPrayerDay from "@/utils/redirectToCurrentPrayerDay";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session?.user) {
    redirectToCurrentPrayerDay();
  } else {
    return <main className="container mx-auto"></main>;
  }
}
