import PrayerDayViewSkeleton from "@/components/prayerView/day/PrayerDayViewSkeleton";
import { DisplayDateWeek } from "@/components/prayerView/week/DisplayDateWeek";
import PrayerWeekRow from "@/components/prayerView/week/PrayerWeekRow";
import WeekDays from "@/components/prayerView/week/WeekDays";
import { getPrayers } from "@/enum/Prayers";
import { PrayerDay } from "@/types/prayerDay";
import { getStartAndEndOfWeek } from "@/utils/getStartAndEndOfWeek";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

type PrayerViewWeekProps = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<string>>;
};
export default function PrayerViewWeek({ date, setDate, setSelected }: PrayerViewWeekProps) {
  const [start, end] = getStartAndEndOfWeek(date);
  const fetcher = (url: string): Promise<PrayerDay[]> => fetch(url).then((res) => res.json());
  const url = `/api/weekPrayers?start=${start}&end=${end}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  const prayers = getPrayers();

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <PrayerDayViewSkeleton />;
  if (!data) return <p>Failed to load</p>;
  return (
    <>
      <DisplayDateWeek date={date} setDate={setDate} start={start} end={end} />
      <WeekDays weekPrayers={data} />
      {prayers.map((prayer) => (
        <PrayerWeekRow
          key={prayer}
          prayer={prayer}
          weekPrayers={data}
          setDate={setDate}
          setSelected={setSelected}
        />
      ))}
    </>
  );
}
