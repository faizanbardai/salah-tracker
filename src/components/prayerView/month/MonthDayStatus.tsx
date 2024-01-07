import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { FaCheck } from "react-icons/fa";

type MonthDayStatusProps = {
  day: string;
  date: string;
  getDayPrayerStatus: (date: string) => boolean;
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
      {dayPrayerStatus ? <FaCheck /> : <div style={{ width: "1rem" }} />}
    </div>
  );
}
