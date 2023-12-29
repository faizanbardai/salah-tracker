import { $Enums } from "@prisma/client";

export type PrayerDay = {
  id: string;
  date: string;
  userId: string;
  fajr: $Enums.PrayerStatus;
  dhuhr: $Enums.PrayerStatus;
  asr: $Enums.PrayerStatus;
  maghrib: $Enums.PrayerStatus;
  isha: $Enums.PrayerStatus;
  tahajjud: $Enums.PrayerStatus;
};
