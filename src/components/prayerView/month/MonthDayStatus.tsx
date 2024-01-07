import { PrayerStatus } from "@/enum/Prayers";
import { PrayerDay } from "@/types/prayerDay";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { FaCheck } from "react-icons/fa";

type MonthDayStatusProps = {
  day: string;
  date: string;
  getDayPrayerStatus: (date: string) => PrayerDay | null;
  setDate: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<string>>;
};
export default function MonthDayStatus(props: MonthDayStatusProps) {
  const { day, date, setDate, setSelected, getDayPrayerStatus } = props;
  const dayPrayerStatus = getDayPrayerStatus(day);
  const isDayInCurrentMonth = dayjs(day).format("MM") === dayjs(date).format("MM");
  let classNames = "flex items-center p-1";
  if (!isDayInCurrentMonth) classNames += " text-gray-400";

  const handleClick = () => {
    setDate(dayjs(day).format("YYYY-MM-DD"));
    setSelected("Day");
  };

  return (
    <div className={classNames} onClick={handleClick}>
      <div className="mr-1">{dayjs(day).format("DD")} </div>
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
  const prayedAllWithJamaat = prayers.every((prayer) => prayer === PrayerStatus.PRAYED_WITH_JAMAAT);
  const prayedOneOnTime = prayers.some((prayer) => prayer === PrayerStatus.PRAYED_ON_TIME);
  const prayedOneQada = prayers.some((prayer) => prayer === PrayerStatus.PRAYED_QADA);

  const color = prayedOneQada
    ? "#eab308"
    : prayedOneOnTime
    ? "#3b82f6"
    : prayedAllWithJamaat
    ? "#22c55e"
    : "gray";
  return (
    <IconContext.Provider value={{ color }}>
      <FaCheck />
    </IconContext.Provider>
  );
}
