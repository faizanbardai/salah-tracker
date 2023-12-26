"use client";
import { Button, ButtonProps } from "@nextui-org/react";
import { GoAlertFill } from "react-icons/go";
import { FaUserClock } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

import { Card, CardBody } from "@nextui-org/react";
import {
  PrayerStatus,
  getPrayerStatus,
  getPrayers,
} from "../../../enum/Prayers";

const userPrayers = {
  Fajr: "NOT_PRAYED",
  Dhuhr: "PRAYED_QADA",
  Asr: "PRAYED_ON_TIME",
  Maghrib: "PRAYED_WITH_JAMAAT",
  Isha: "NOT_PRAYED",
};

export default function PrayerViewDay() {
  const prayers = getPrayers();
  return prayers.map((prayer) => <PrayerRow key={prayer} prayer={prayer} />);
}

function PrayerRow({ prayer }: { prayer: string }) {
  return (
    <Card className="mb-2" key={prayer}>
      <CardBody>
        <PrayerStatusButtons prayer={prayer} />
      </CardBody>
    </Card>
  );
}

function PrayerStatusButtons({ prayer }: { prayer: string }) {
  const prayerStatuses = getPrayerStatus();
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">{prayer}</div>
      {prayerStatuses.map((status) => (
        <PrayerStatusButton key={status} status={status} prayer={prayer} />
      ))}
    </div>
  );
}

type PrayerStatusButtonProps = {
  prayer: string;
  status: string;
};
function PrayerStatusButton({
  prayer,
  status,
}: PrayerStatusButtonProps): JSX.Element {
  const size = "25";
  let icon: JSX.Element = <GoAlertFill size={size} />;
  let color: ButtonProps["color"];
  switch (status) {
    case PrayerStatus.NOT_PRAYED:
      icon = <GoAlertFill size={size} />;
      color = "danger";
      break;
    case PrayerStatus.PRAYED_QADA:
      icon = <FaUserClock size={size} />;
      color = "secondary";
      break;
    case PrayerStatus.PRAYED_ON_TIME:
      icon = <FaUserShield size={size} />;
      color = "primary";
      break;
    case PrayerStatus.PRAYED_WITH_JAMAAT:
      icon = <FaUsers size={size} />;
      color = "success";
      break;
  }

  color =
    userPrayers[prayer as keyof typeof userPrayers] === status
      ? color
      : "default";
  const variant: ButtonProps["variant"] =
    userPrayers[prayer as keyof typeof userPrayers] === status
      ? "solid"
      : "bordered";

  return (
    <Button
      isIconOnly
      size="md"
      aria-label="prayed qada"
      radius="full"
      color={color}
      variant={variant}
      className="border-none"
    >
      {icon}
    </Button>
  );
}
