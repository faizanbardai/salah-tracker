import PrayerDayViewSkeleton from "@/components/prayerView/day/PrayerDayViewSkeleton";
import DisplayDateMonth from "@/components/prayerView/month/DisplayDateMonth";
import { PrayerDay } from "@/types/prayerDay";
import getStartAndEndOfMonth from "@/utils/getStartAndEndOfMonth";
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
  return (
    <>
      <DisplayDateMonth date={date} setDate={setDate} />
      {data.length}
    </>
  );
}
