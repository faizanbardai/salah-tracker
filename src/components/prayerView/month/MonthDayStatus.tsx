const moment = require("moment-hijri");
import { PrayerStatus } from "@/enum/Prayers";
import { HijriDateContext } from "@/providers/HijriDateProvider";
import { PrayerDay } from "@/types/prayerDay";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useContext } from "react";
import { IconContext } from "react-icons";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

type MonthDayStatusProps = {
  day: string;
  date: string;
  getDayPrayerStatus: (date: string) => PrayerDay | null;
  setDate: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<string>>;
};
export default function MonthDayStatus(props: MonthDayStatusProps) {
  const { showHijriDate } = useContext(HijriDateContext);
  const { day, date, setDate, setSelected, getDayPrayerStatus } = props;
  const dayPrayerStatus = getDayPrayerStatus(day);
  const isDayInCurrentMonth = dayjs(day).format("MM") === dayjs(date).format("MM");
  const isDayToday = day === dayjs().format("YYYY-MM-DD");
  let classNames = "flex items-center p-1";
  if (!isDayInCurrentMonth) classNames += " text-gray-400";
  if (isDayToday) classNames += " border rounded-lg border-indigo-500";

  const handleClick = () => {
    setDate(dayjs(day).format("YYYY-MM-DD"));
    setSelected("Day");
  };

  const gregorianDate = dayjs(day).format("DD");
  const hijriDate = moment(day).format("iDD");
  const dateToDisplay = showHijriDate ? hijriDate : gregorianDate;

  return (
    <div className={classNames} onClick={handleClick}>
      {dateToDisplay}
      {dayPrayerStatus ? (
        <DayCheckMark dayPrayerStatus={dayPrayerStatus} />
      ) : (
        <div style={{ width: "1rem" }} />
      )}
    </div>
  );
}

type DayCheckMarkProps = {
  dayPrayerStatus: PrayerDay;
};
function DayCheckMark({ dayPrayerStatus }: DayCheckMarkProps) {
  const { fajr, dhuhr, asr, maghrib, isha } = dayPrayerStatus;
  const prayers = [fajr, dhuhr, asr, maghrib, isha];
  const prayedAll = !prayers.some((prayer) => prayer === PrayerStatus.NOT_PRAYED);
  const prayedOneWithJamaat = prayers.some((prayer) => prayer === PrayerStatus.PRAYED_WITH_JAMAAT);
  const prayedOneOnTime = prayers.some((prayer) => prayer === PrayerStatus.PRAYED_ON_TIME);
  const prayedOneQada = prayers.some((prayer) => prayer === PrayerStatus.PRAYED_QADA);
  const prayedNone = prayers.every((prayer) => prayer === PrayerStatus.NOT_PRAYED);

  const icon = prayedAll ? <IoCheckmarkDone /> : prayedNone ? <div></div> : <IoCheckmark />;
  const color = prayedOneQada
    ? "#eab308"
    : prayedOneOnTime
    ? "#3b82f6"
    : prayedOneWithJamaat
    ? "#22c55e"
    : "gray";
  return (
    <IconContext.Provider
      value={{
        color,
        size: "1.5rem",
      }}
    >
      {icon}
    </IconContext.Provider>
  );
}
