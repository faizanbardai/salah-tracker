"use client";
import PrayerStatusButton from "@/components/prayerView/day/PrayerStatusButton";
import { Prayer, PrayerStatus, getPrayerDisplayName, getPrayerStatus } from "@/enum/Prayers";
import { PrayerDay } from "@/types/prayerDay";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { KeyedMutator } from "swr";

type PrayerRowProps = {
  date: string;
  prayer: Prayer;
  userPrayerStatus: PrayerStatus;
  mutate: KeyedMutator<PrayerDay>;
};
export default function PrayerRow(props: PrayerRowProps) {
  const { date, prayer, userPrayerStatus, mutate } = props;
  const [loading, setLoading] = useState(false);

  const prayerStatuses = getPrayerStatus();
  return (
    <Card className="mb-2">
      <CardBody>
        <div className="flex gap-4 items-center">
          <div className="flex-1">{getPrayerDisplayName(prayer)}</div>
          {loading && <Spinner color="primary" />}
          {prayerStatuses.map((status) => (
            <PrayerStatusButton
              key={status}
              date={date}
              status={status}
              prayer={prayer}
              prayerStatus={userPrayerStatus}
              loading={loading}
              setLoading={setLoading}
              mutate={mutate}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
