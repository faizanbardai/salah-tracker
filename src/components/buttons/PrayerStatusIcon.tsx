import { PrayerStatus } from "@/enum/Prayers";
import { GoAlertFill } from "react-icons/go";
import { FaUserClock } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

export default function PrayerStatusIcon(status: PrayerStatus, selected: boolean) {
  const selectedSize = "18";
  const unselectedSize = "16";
  const size = selected ? selectedSize : unselectedSize;
  let icon = <GoAlertFill size={unselectedSize} />;
  switch (status) {
    case PrayerStatus.NOT_PRAYED:
      icon = <GoAlertFill size={size} />;
      break;
    case PrayerStatus.PRAYED_QADA:
      icon = <FaUserClock size={size} />;
      break;
    case PrayerStatus.PRAYED_ON_TIME:
      icon = <FaUserShield size={size} />;
      break;
    case PrayerStatus.PRAYED_WITH_JAMAAT:
      icon = <FaUsers size={size} />;
      break;
  }
  return icon;
}
