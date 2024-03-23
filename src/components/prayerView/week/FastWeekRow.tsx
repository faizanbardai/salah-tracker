import { PrayerDay } from "@/types/prayerDay";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";

type FastWeekRowProps = {
  date: string;
  weekFasts: PrayerDay[];
  setDate: Dispatch<SetStateAction<string>>;
  setSelectedTab: (tab: string) => void;
};
export default function FastWeekRow({
  date,
  weekFasts,
  setDate,
  setSelectedTab,
}: FastWeekRowProps) {
  function handleClick(date: string) {
    setDate(date);
    setSelectedTab("Day");
  }
  return (
    <div className="flex gap-1 items-center">
      <div className="flex-1">Fast</div>
      {weekFasts.map((weekFast) => {
        const icon = weekFast.fast ? (
          <IconContext.Provider
            value={{
              color: "#18c964",
              size: "26",
            }}
          >
            <FaUser />
          </IconContext.Provider>
        ) : null;

        return (
          <Button
            key={weekFast.id}
            isIconOnly
            size="sm"
            aria-label="prayed status icon"
            radius="full"
            variant="bordered"
            className="border-none"
            onClick={() => handleClick(weekFast.date as string)}
          >
            {icon}
          </Button>
        );
      })}
    </div>
  );
}
