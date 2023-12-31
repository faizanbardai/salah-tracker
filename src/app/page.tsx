import { authOptions } from "@/service/auth/authOptions";
import { getServerSession } from "next-auth/next";
import PrayerViewTabs from "@/components/prayerView/PrayerViewTabs";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <main className="container mx-auto">Please Login</main>;
  }

  return <PrayerViewTabs />;
}
