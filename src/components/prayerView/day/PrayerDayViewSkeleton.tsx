import { getPrayers } from "@/enum/Prayers";
import { Card, CardBody, Skeleton, Spinner } from "@nextui-org/react";

export default function PrayerDayViewSkeleton() {
  const prayers = getPrayers();
  const icons = [1, 2, 3];
  return prayers.map((prayer) => (
    <Card className="mb-2" key={prayer}>
      <CardBody>
        <div className="flex gap-4 items-center">
          <Skeleton className="flex-1 rounded-full">
            <div>Test</div>
          </Skeleton>
          {icons.map((icon) => (
            <IconSkeleton key={icon} />
          ))}
        </div>
      </CardBody>
    </Card>
  ));
}

function IconSkeleton() {
  return (
    <Skeleton className="rounded-full">
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      ></div>
    </Skeleton>
  );
}
