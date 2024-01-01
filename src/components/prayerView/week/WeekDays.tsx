import { PrayerDay } from "@/types/prayerDay";
import { Card, CardBody } from "@nextui-org/react";

type WeekDaysProps = {
  weekPrayers: PrayerDay[];
};
export default function WeekDays({ weekPrayers }: WeekDaysProps) {
  const days = weekPrayers.map((weekPrayer) => {
    const date = new Date(weekPrayer.date);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    return day.slice(0, 2);
  });
  return (
    <Card className="mb-2">
      <CardBody>
        <div className="flex gap-1">
          <div className="flex-1"></div>
          {days.map((day) => (
            <div key={day} className="text-center" style={{ width: 32 }}>
              {day}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
