import PrayerDayViewSkeleton from "@/components/prayerView/day/PrayerDayViewSkeleton";
import MonthDayStatus from "@/components/prayerView/month/MonthDayStatus";
import { PrayerDay } from "@/types/prayerDay";
import getMonthDaysByWeek from "@/utils/getMonthDaysByWeek";
import getStartAndEndOfMonth from "@/utils/getStartAndEndOfMonth";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
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
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function getDayPrayerStatus(day: string) {
    const dayPrayer = (data || []).find((dayPrayer) => dayjs(dayPrayer.date).isSame(day, "day"));
    if (!dayPrayer) return false;
    const { fajr, dhuhr, asr, maghrib, isha } = dayPrayer;
    const notAllPrayed = [fajr, dhuhr, asr, maghrib, isha].some(
      (p) => p === PrayerStatus.NOT_PRAYED
    );
    return !notAllPrayed;
  }

  return (
    <Table aria-label="Calendar view" removeWrapper isCompact>
      <TableHeader>
        {weekDays.map((weekDay) => (
          <TableColumn key={weekDay} className="px-0 px-1">
            {weekDay}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {weeks.map((week, index) => (
          <TableRow key={index}>
            {week.map((day) => (
              <TableCell key={day} className="px-0 pr-1">
                <MonthDayStatus
                  day={day}
                  date={date}
                  setDate={setDate}
                  setSelected={setSelected}
                  getDayPrayerStatus={getDayPrayerStatus}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
