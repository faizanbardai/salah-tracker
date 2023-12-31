enum Prayer {
  fajr = "fajr",
  dhuhr = "dhuhr",
  asr = "asr",
  maghrib = "maghrib",
  isha = "isha",
  tahajjud = "tahajjud",
}

enum PrayerStatus {
  NOT_PRAYED = "NOT_PRAYED",
  PRAYED_QADA = "PRAYED_QADA",
  PRAYED_ON_TIME = "PRAYED_ON_TIME",
  PRAYED_WITH_JAMAAT = "PRAYED_WITH_JAMAAT",
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
