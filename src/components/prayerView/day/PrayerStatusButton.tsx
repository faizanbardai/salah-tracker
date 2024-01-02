"use client";
import PrayerStatusIcon from "@/components/buttons/PrayerStatusIcon";
import { Prayer, PrayerStatus } from "@/enum/Prayers";
import { PrayerDay } from "@/types/prayerDay";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

type PrayerStatusButtonProps = {
  date: string;
  status: PrayerStatus;
  prayer: Prayer;
  prayerStatus: PrayerStatus;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  mutate: KeyedMutator<PrayerDay>;
};
export default function PrayerStatusButton(props: PrayerStatusButtonProps) {
  const { date, prayer, status, prayerStatus, mutate } = props;
  const { loading, setLoading } = props;

  const icon = PrayerStatusIcon(status, prayerStatus === status);

  function handleClick() {
    const newStatus = prayerStatus === status ? PrayerStatus.NOT_PRAYED : status;
    setLoading(true);

    fetch("/api/dayPrayers", {
      method: "POST",
      body: JSON.stringify({
        status: newStatus,
        date,
        prayer,
      }),
    })
      .then((res) => {
        const data = res.json() as Promise<PrayerDay>;
        mutate(data, { revalidate: false });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Button
      isIconOnly
      size="md"
      aria-label="prayer status icon"
      radius="full"
      variant="bordered"
      className="border-none"
      onClick={handleClick}
      disabled={loading}
    >
      {icon}
    </Button>
  );
}
