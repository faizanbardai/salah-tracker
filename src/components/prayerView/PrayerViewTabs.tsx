"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import PrayerViewDay from "./day/PrayerViewDay";
import DisplayDateDay from "@/components/DisplayDateDay";
import { useState } from "react";
import PrayerViewWeek from "@/components/prayerView/week/PrayerViewWeek";
import PrayerViewMonth from "@/components/prayerView/month/PrayerViewMonth";
import { DisplayDateWeek } from "@/components/prayerView/week/DisplayDateWeek";

export default function PrayerViewTabs() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [selected, setSelected] = useState("Day");

  return (
    <div className="flex w-full flex-col px-2">
      <Tabs
        aria-label="Options"
        fullWidth
        color="primary"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
      >
        <Tab key="Day" title="Day">
          <DisplayDateDay date={date} setDate={setDate} />
          <PrayerViewDay date={date} />
        </Tab>
        <Tab key="Week" title="Week">
          <DisplayDateWeek date={date} setDate={setDate} />
          <PrayerViewWeek date={date} setDate={setDate} setSelected={setSelected} />
        </Tab>
        <Tab key="Month" title="Month">
          <PrayerViewMonth date={date} setDate={setDate} setSelected={setSelected} />
        </Tab>
      </Tabs>
    </div>
  );
}
