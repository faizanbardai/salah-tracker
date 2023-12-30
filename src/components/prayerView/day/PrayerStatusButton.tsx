"use client";
import { Dispatch, SetStateAction } from "react";

import { Button, ButtonProps } from "@nextui-org/react";

import PrayerStatusIcon from "@/components/buttons/PrayerStatusIcon";
import getPrayerStatusColor from "@/utils/getPrayerStatusColor";
import { PrayerStatus } from "@/enum/Prayers";

type PrayerStatusButtonProps = {
  date: string;
  status: string;
  prayer: string;
  prayerStatus: string;
  setPrayerStatus: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  setDisable: Dispatch<SetStateAction<boolean>>;
};
export default function PrayerStatusButton(props: PrayerStatusButtonProps) {
  const { date, prayer, status, prayerStatus, setPrayerStatus } = props;
  const { loading, setLoading, disable, setDisable } = props;

  const icon = PrayerStatusIcon(status, prayerStatus);
  const color = getPrayerStatusColor(status, prayerStatus);

  const variant: ButtonProps["variant"] = prayerStatus === status ? "solid" : "bordered";

  function handleClick() {
    const newStatus = prayerStatus === status ? PrayerStatus.NOT_PRAYED : status;
    setLoading(true);
    setDisable(true);
    setPrayerStatus(newStatus);
    fetch("/api/prayers", {
      method: "POST",
      body: JSON.stringify({ date, prayer, status: newStatus }),
    })
      .then(() => {})
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
        setDisable(false);
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
      disabled={disable || loading}
    >
      {icon}
    </Button>
  );
}
