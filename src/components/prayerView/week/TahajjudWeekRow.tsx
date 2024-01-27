import { PrayerDay } from "@/types/prayerDay";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { FaHouseChimneyUser } from "react-icons/fa6";

type TahajjudWeekRowProps = {
  date: string;
  weekFasts: PrayerDay[];
  setDate: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<string>>;
};
export default function TahajjudWeekRow({
  date,
  weekFasts,
  setDate,
  setSelected,
}: TahajjudWeekRowProps) {
  function handleClick(date: string) {
    setDate(date);
    setSelected("Day");
  }
  return (
    <div className="flex gap-1 items-center">
      <div className="flex-1">Tahajjud</div>
      {weekFasts.map((weekFast) => {
        const icon = weekFast.tahajjud ? (
          <IconContext.Provider
            value={{
              color: "#18c964",
              size: "26",
            }}
          >
            <FaHouseChimneyUser />
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
