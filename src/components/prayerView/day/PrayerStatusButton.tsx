"use client";
import { Dispatch, SetStateAction } from "react";

import { Button, ButtonProps } from "@nextui-org/react";

import PrayerStatusIcon from "@/components/buttons/PrayerStatusIcon";
import getPrayerStatusColor from "@/utils/getPrayerStatusColor";

type PrayerStatusButtonProps = {
  date: string;
  status: string;
  prayer: string;
  prayerStatus: string;
  setPrayerStatus: Dispatch<SetStateAction<string>>;
};
export default function PrayerStatusButton(props: PrayerStatusButtonProps) {
  const { date, prayer, status, prayerStatus, setPrayerStatus } = props;

  const icon = PrayerStatusIcon(status, prayerStatus);
  const color = getPrayerStatusColor(status, prayerStatus);

  const variant: ButtonProps["variant"] =
    prayerStatus === status ? "solid" : "bordered";

  function handleClick() {
    if (prayerStatus === status) return;
    fetch("/api/prayers", {
      method: "POST",
      body: JSON.stringify({ date, prayer, status }),
    })
      .then((res) => {
        if (res.ok) setPrayerStatus(status);
      })
      .catch((err) => {
        console.error(err);
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
    >
      {icon}
    </Button>
  );
}
