"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import PrayerViewDay from "./day/PrayerViewDay";
import DisplayDateDay from "@/components/DisplayDateDay";
import { useState } from "react";
import PrayerViewWeek from "@/components/prayerView/week/PrayerViewWeek";

export default function PrayerViewTabs() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [selected, setSelected] = useState("Week");

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
          <PrayerViewWeek date={date} setDate={setDate} setSelected={setSelected} />
        </Tab>
        <Tab key="Month" title="Month">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
