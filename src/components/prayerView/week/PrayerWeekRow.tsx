import PrayerStatusIcon from "@/components/buttons/PrayerStatusIcon";
import { Prayer, PrayerStatus, getPrayerDisplayName } from "@/enum/Prayers";
import { PrayerDay } from "@/types/prayerDay";
import getPrayerStatusColor from "@/utils/getPrayerStatusColor";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

type PrayerWeekRowProps = {
  prayer: Prayer;
  weekPrayers: PrayerDay[];
  setDate: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<string>>;
};
export default function PrayerWeekRow({
  prayer,
  weekPrayers,
  setDate,
  setSelected,
}: PrayerWeekRowProps) {
  function handleClick(date: string) {
    setDate(date);
    setSelected("Day");
  }
  return (
    <Card className="mb-2">
      <CardBody>
        <div className="flex gap-1 items-center">
          <div className="flex-1">{getPrayerDisplayName(prayer)}</div>
          {weekPrayers.map((weekPrayer) => {
            const icon = PrayerStatusIcon(weekPrayer[prayer], true);
            const color = getPrayerStatusColor(weekPrayer[prayer], true);

            return (
              <Button
                key={weekPrayer.id}
                isIconOnly
                size="sm"
                aria-label="prayed qada"
                radius="full"
                color={color}
                className="border-none"
                onClick={() => handleClick(weekPrayer.date as string)}
              >
                {icon}
              </Button>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
