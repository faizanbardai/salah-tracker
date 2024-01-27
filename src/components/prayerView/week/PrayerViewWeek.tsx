import PrayerDayViewSkeleton from "@/components/prayerView/day/PrayerDayViewSkeleton";
import PrayerWeekRow from "@/components/prayerView/week/PrayerWeekRow";
import WeekDays from "@/components/prayerView/week/WeekDays";
import { getPrayers } from "@/enum/Prayers";
import { PrayerDay } from "@/types/prayerDay";
import { getStartAndEndOfWeek } from "@/utils/getStartAndEndOfWeek";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import FastWeekRow from "./FastWeekRow";
import TahajjudWeekRow from "./TahajjudWeekRow";

type PrayerViewWeekProps = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<string>>;
};
export default function PrayerViewWeek({ date, setDate, setSelected }: PrayerViewWeekProps) {
  const [start, end] = getStartAndEndOfWeek(date);
  const fetcher = (url: string): Promise<PrayerDay[]> => fetch(url).then((res) => res.json());
  const url = `/api/prayers?start=${start}&end=${end}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  const prayers = getPrayers();

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <PrayerDayViewSkeleton />;
  if (!data) return <p>Failed to load</p>;
  return (
    <Card>
      <CardBody>
        <WeekDays weekPrayers={data} />
      </CardBody>
      <Divider />
      <CardBody>
        {prayers.map((prayer) => (
          <PrayerWeekRow
            key={prayer}
            prayer={prayer}
            weekPrayers={data}
            setDate={setDate}
            setSelected={setSelected}
          />
        ))}
      </CardBody>
      <Divider />
      <CardBody>
        <TahajjudWeekRow date={date} weekFasts={data} setDate={setDate} setSelected={setSelected} />
      </CardBody>
      <Divider />
      <CardBody>
        <FastWeekRow date={date} weekFasts={data} setDate={setDate} setSelected={setSelected} />
      </CardBody>
    </Card>
  );
}
