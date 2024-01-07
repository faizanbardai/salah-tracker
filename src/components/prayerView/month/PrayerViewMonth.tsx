import PrayerDayViewSkeleton from "@/components/prayerView/day/PrayerDayViewSkeleton";
import MonthDayStatus from "@/components/prayerView/month/MonthDayStatus";
import { PrayerDay } from "@/types/prayerDay";
import getMonthDaysByWeek from "@/utils/getMonthDaysByWeek";
import getStartAndEndOfMonth from "@/utils/getStartAndEndOfMonth";
import { Card, CardBody } from "@nextui-org/react";
import { PrayerStatus } from "@prisma/client";
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
    const { fajr, dhuhr, asr, maghrib, isha } = dayPrayer;
    const notAllPrayed = [fajr, dhuhr, asr, maghrib, isha].some(
      (prayer) => prayer === PrayerStatus.NOT_PRAYED
    );
    if (notAllPrayed) return null;
    return dayPrayer;
  }

  return (
    <>
      <Card className="mb-2">
        <CardBody>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((weekDay) => (
              <div key={weekDay}>{weekDay}</div>
            ))}
          </div>
        </CardBody>
      </Card>
      {weeks.map((week, index) => (
        <Card key={index} className="mb-2">
          <CardBody>
            <div className="grid grid-cols-7">
              {week.map((day) => (
                <div key={day}>
                  <MonthDayStatus
                    day={day}
                    date={date}
                    setDate={setDate}
                    setSelected={setSelected}
                    getDayPrayerStatus={getDayPrayerStatus}
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
