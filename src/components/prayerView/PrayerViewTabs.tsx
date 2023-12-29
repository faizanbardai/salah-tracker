"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import PrayerViewDay from "./day/PrayerViewDay";
import { PrayerDay } from "@/types/prayerDay";
import DisplayDate from "@/components/DisplayDate";

type PrayerViewTabsProps = {
  date: string;
  userPrayerDay: PrayerDay;
};
export default function PrayerViewTabs({
  date,
  userPrayerDay,
}: PrayerViewTabsProps) {
  return (
    <div className="flex w-full flex-col px-2">
      <Tabs aria-label="Options" fullWidth color="primary">
        <Tab key="Day" title="Day">
          <DisplayDate date={date} />
          <PrayerViewDay date={date} userPrayerDay={userPrayerDay} />
        </Tab>
        <Tab key="Week" title="Week">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Month" title="Month">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
