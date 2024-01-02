import { PrayerStatus } from "@/enum/Prayers";
import { ButtonProps } from "@nextui-org/react";

export default function getPrayerStatusColor(status: string, selected: boolean) {
  let color: ButtonProps["color"];
  switch (status) {
    case PrayerStatus.NOT_PRAYED:
      color = "danger";
      break;
    case PrayerStatus.PRAYED_QADA:
      color = "warning";
      break;
    case PrayerStatus.PRAYED_ON_TIME:
      color = "primary";
      break;
    case PrayerStatus.PRAYED_WITH_JAMAAT:
      color = "success";
      break;
  }

  color = selected ? color : "default";
  return color;
}
