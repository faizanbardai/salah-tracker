import PrayerDayViewSkeleton from "@/components/prayerView/day/PrayerDayViewSkeleton";
import PrayerRow from "@/components/prayerView/day/PrayerRow";
import { getPrayers } from "@/enum/Prayers";
import { PrayerDay } from "@/types/prayerDay";
import { Card, CardBody, CardHeader, Checkbox, Divider } from "@nextui-org/react";
import useSWR from "swr";
import TahajjudRow from "./TahajjudRow";
import FastRow from "./FastRow";

type PrayerViewDayProps = {
  date: string;
};
export default function PrayerViewDay({ date }: PrayerViewDayProps) {
  const fetcher = (url: string): Promise<PrayerDay> => fetch(url).then((res) => res.json());
  const url = `/api/dayPrayers?date=${date}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, { revalidateOnFocus: false });

  const prayers = getPrayers();

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <PrayerDayViewSkeleton />;
  if (!data) return <p>Failed to load</p>;

  const allPrayers = prayers.map((prayer) => {
    const userPrayerStatus = data[prayer];

    return (
      <PrayerRow
        key={prayer}
        date={date}
        prayer={prayer}
        userPrayerStatus={userPrayerStatus}
        mutate={mutate}
      />
    );
  });

  return (
    <Card>
      <CardBody>{allPrayers}</CardBody>
      <Divider />
      <CardBody>
        <TahajjudRow date={date} tahajjud={data.tahajjud} mutate={mutate} />
      </CardBody>
      <Divider />
      <CardBody>
        <FastRow date={date} fast={data.fast} mutate={mutate} />
      </CardBody>
    </Card>
  );
}
