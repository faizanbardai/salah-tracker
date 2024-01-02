import { PrayerStatus } from "@/enum/Prayers";
import { IconContext } from "react-icons";
import { FaUserClock, FaUserShield } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

export default function PrayerStatusIcon(status: PrayerStatus, selected: boolean) {
  const selectedSize = "26";
  const unselectedSize = "24";
  const defaultColor = "gray";

  let icon = <div></div>;
  let color;
  switch (status) {
    case PrayerStatus.PRAYED_QADA:
      icon = <FaUserClock />;
      color = "#eab308";
      break;
    case PrayerStatus.PRAYED_ON_TIME:
      icon = <FaUserShield />;
      color = "#3b82f6";
      break;
    case PrayerStatus.PRAYED_WITH_JAMAAT:
      icon = <FaUsers />;
      color = "#22c55e";
      break;
  }
  const size = selected ? selectedSize : unselectedSize;
  color = selected ? color : defaultColor;
  return (
    <IconContext.Provider
      value={{
        color: color,
        size: size,
      }}
    >
      {icon}
    </IconContext.Provider>
  );
}
