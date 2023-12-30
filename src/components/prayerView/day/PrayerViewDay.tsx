"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardBody, Spinner } from "@nextui-org/react";

import { getPrayerDisplayName, getPrayerStatus, getPrayers } from "@/enum/Prayers";

import PrayerStatusButton from "@/components/prayerView/day/PrayerStatusButton";

import { PrayerDay } from "@/types/prayerDay";

type PrayerViewDayProps = {
  date: string;
  userPrayerDay: PrayerDay;
};
export default function PrayerViewDay({ date, userPrayerDay }: PrayerViewDayProps) {
  const [disable, setDisable] = useState(false);
  const prayers = getPrayers();
  return prayers.map((prayer) => (
    <PrayerRow
      key={prayer}
      date={date}
      prayer={prayer}
      disable={disable}
      setDisable={setDisable}
      userPrayerStatus={
        userPrayerDay[prayer as "fajr" | "dhuhr" | "asr" | "maghrib" | "isha" | "tahajjud"]
      }
    />
  ));
}

type PrayerRowProps = {
  date: string;
  prayer: string;
  userPrayerStatus: string;
  disable: boolean;
  setDisable: Dispatch<SetStateAction<boolean>>;
};
function PrayerRow(props: PrayerRowProps) {
  const { date, prayer, userPrayerStatus, disable, setDisable } = props;
  const [prayerStatus, setPrayerStatus] = useState(userPrayerStatus);
  const [loading, setLoading] = useState(false);

  const prayerStatuses = getPrayerStatus();
  return (
    <Card className="mb-2" key={prayer}>
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
              prayerStatus={prayerStatus}
              setPrayerStatus={setPrayerStatus}
              loading={loading}
              setLoading={setLoading}
              disable={disable}
              setDisable={setDisable}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
