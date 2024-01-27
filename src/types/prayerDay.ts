import { Prayer, PrayerStatus } from "@/enum/Prayers";

export type PrayerDay = {
  id: string;
  date: Date | string;
  userId: string;
  fajr: PrayerStatus;
  dhuhr: PrayerStatus;
  asr: PrayerStatus;
  maghrib: PrayerStatus;
  isha: PrayerStatus;
  tahajjud: boolean;
  fast: boolean;
};
