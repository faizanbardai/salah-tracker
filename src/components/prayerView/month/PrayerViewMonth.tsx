import PrayerDayViewSkeleton from "@/components/prayerView/day/PrayerDayViewSkeleton";
import MonthDayStatus from "@/components/prayerView/month/MonthDayStatus";
import { PrayerDay } from "@/types/prayerDay";
import getMonthDaysByWeek from "@/utils/getMonthDaysByWeek";
import getStartAndEndOfMonth from "@/utils/getStartAndEndOfMonth";
import { Card, CardBody, Divider } from "@nextui-org/react";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

type PrayerViewMonthProps = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<string>>;
};
export default function PrayerViewMonth({ date, setDate, setSelected }: PrayerViewMonthProps) {
  const [start, end] = getStartAndEndOfMonth(date);
  const fetcher = (url: string): Promise<PrayerDay[]> => fetch(url).then((res) => res.json());
  const url = `/api/prayers?start=${start}&end=${end}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <PrayerDayViewSkeleton />;
  if (!data) return <p>Failed to load</p>;

  const weeks: string[][] = getMonthDaysByWeek(date);
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  function getDayPrayerStatus(day: string): PrayerDay | null {
    const dayPrayer = (data || []).find((dayPrayer) => dayjs(dayPrayer.date).isSame(day, "day"));
    if (!dayPrayer) return null;
    return dayPrayer;
  }

  return (
    <Card>
      <CardBody>
        <div className="grid gap-1 grid-cols-7">
          {weekDays.map((weekDay) => (
            <div key={weekDay}>{weekDay}</div>
          ))}
        </div>
      </CardBody>
      <Divider />
      <CardBody>
        {weeks.map((week, index) => (
          <MonthWeekRow
            key={index}
            week={week}
            date={date}
            setDate={setDate}
            setSelected={setSelected}
            getDayPrayerStatus={getDayPrayerStatus}
          />
        ))}
      </CardBody>
    </Card>
  );
}

type MonthWeekRowProps = {
  week: string[];
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<string>>;
  getDayPrayerStatus: (day: string) => PrayerDay | null;
};
function MonthWeekRow(props: MonthWeekRowProps) {
  const { week, date, setDate, setSelected, getDayPrayerStatus } = props;
  return (
    <div className="grid gap-1 grid-cols-7 pb-1">
      {week.map((day) => (
        <MonthDayStatus
          key={day}
          day={day}
          date={date}
          setDate={setDate}
          setSelected={setSelected}
          getDayPrayerStatus={getDayPrayerStatus}
        />
      ))}
    </div>
  );
}
