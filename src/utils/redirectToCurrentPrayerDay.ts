import { redirect } from "next/navigation";

export default function redirectToCurrentPrayerDay() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  redirect(`/prayer/${year}-${month}-${day}`);
}
