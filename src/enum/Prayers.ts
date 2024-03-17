enum Prayer {
  fajr = "fajr",
  dhuhr = "dhuhr",
  asr = "asr",
  maghrib = "maghrib",
  isha = "isha",
}

enum PrayerStatus {
  NOT_PRAYED = 0,
  PRAYED_QADA = 1,
  PRAYED_ON_TIME = 2,
  PRAYED_WITH_JAMAAT = 3,
}

const getPrayers = () => {
  return [Prayer.fajr, Prayer.dhuhr, Prayer.asr, Prayer.maghrib, Prayer.isha];
};

const getPrayerDisplayName = (prayer: string) => {
  switch (prayer) {
    case Prayer.fajr:
      return "Fajr";
    case Prayer.dhuhr:
      return "Dhuhr";
    case Prayer.asr:
      return "Asr";
    case Prayer.maghrib:
      return "Maghrib";
    case Prayer.isha:
      return "Isha";
  }
};

const getPrayerStatus = () => {
  return [PrayerStatus.PRAYED_QADA, PrayerStatus.PRAYED_ON_TIME, PrayerStatus.PRAYED_WITH_JAMAAT];
};

export { Prayer, getPrayers, PrayerStatus, getPrayerStatus, getPrayerDisplayName };
