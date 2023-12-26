const Prayers = {
  Fajr: "Fajr",
  Dhuhr: "Dhuhr",
  Asr: "Asr",
  Maghrib: "Maghrib",
  Isha: "Isha",
};

const PrayerStatus = {
  NOT_PRAYED: "NOT_PRAYED",
  PRAYED_QADA: "PRAYED_QADA",
  PRAYED_ON_TIME: "PRAYED_ON_TIME",
  PRAYED_WITH_JAMAAT: "PRAYED_WITH_JAMAAT",
};

const getPrayers = () => {
  return Object.values(Prayers);
};

const getPrayerStatus = () => {
  return Object.values(PrayerStatus);
};

export { Prayers, getPrayers, PrayerStatus, getPrayerStatus };
