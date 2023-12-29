import { PrayerStatus } from "@/enum/Prayers";
import { GoAlertFill } from "react-icons/go";
import { FaUserClock } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

export default function PrayerStatusIcon(status: string, prayerStatus: string) {
  const selectedSize = "22";
  const unselectedSize = "20";
  const size = prayerStatus === status ? selectedSize : unselectedSize;
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
