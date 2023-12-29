import { PrayerStatus } from "@/enum/Prayers";
import { ButtonProps } from "@nextui-org/react";

export default function getPrayerStatusColor(
  status: string,
  prayerStatus: string
) {
  let color: ButtonProps["color"];
  switch (status) {
    case PrayerStatus.NOT_PRAYED:
      color = "danger";
      break;
    case PrayerStatus.PRAYED_QADA:
      color = "secondary";
      break;
    case PrayerStatus.PRAYED_ON_TIME:
      color = "primary";
      break;
    case PrayerStatus.PRAYED_WITH_JAMAAT:
      color = "success";
      break;
  }

  color = prayerStatus === status ? color : "default";
  return color;
}
