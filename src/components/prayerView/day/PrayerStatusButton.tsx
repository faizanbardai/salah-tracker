"use client";
import { Dispatch, SetStateAction } from "react";

import { Button, ButtonProps } from "@nextui-org/react";

import PrayerStatusIcon from "@/components/buttons/PrayerStatusIcon";
import getPrayerStatusColor from "@/utils/getPrayerStatusColor";
import { Prayer, PrayerStatus } from "@/enum/Prayers";
import { KeyedMutator } from "swr";
import { PrayerDay } from "@/types/prayerDay";

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

  const icon = PrayerStatusIcon(status, prayerStatus);
  const color = getPrayerStatusColor(status, prayerStatus);

  const variant: ButtonProps["variant"] = prayerStatus === status ? "solid" : "bordered";

  function handleClick() {
    const newStatus = prayerStatus === status ? PrayerStatus.NOT_PRAYED : status;
    setLoading(true);

    fetch("/api/prayers", {
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
      aria-label="prayed qada"
      radius="full"
      color={color}
      variant={variant}
      className="border-none"
      onClick={handleClick}
      disabled={loading}
    >
      {icon}
    </Button>
  );
}
