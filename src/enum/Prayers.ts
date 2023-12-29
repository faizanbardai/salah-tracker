const Prayers = {
  fajr: "fajr",
  dhuhr: "dhuhr",
  asr: "asr",
  maghrib: "maghrib",
  isha: "isha",
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

const getPrayerDisplayName = (prayer: string) => {
  switch (prayer) {
    case Prayers.fajr:
      return "Fajr";
    case Prayers.dhuhr:
      return "Dhuhr";
    case Prayers.asr:
      return "Asr";
    case Prayers.maghrib:
      return "Maghrib";
    case Prayers.isha:
      return "Isha";
  }
};

const getPrayerStatus = () => {
  return Object.values(PrayerStatus).filter(
    (x) => x !== PrayerStatus.NOT_PRAYED
  );
};

export {
  Prayers,
  getPrayers,
  PrayerStatus,
  getPrayerStatus,
  getPrayerDisplayName,
};
