"use client";
import DisplayDateDay from "@/components/prayerView/day/DisplayDateDay";
import DisplayDateMonth from "@/components/prayerView/month/DisplayDateMonth";
import PrayerViewMonth from "@/components/prayerView/month/PrayerViewMonth";
import { DisplayDateWeek } from "@/components/prayerView/week/DisplayDateWeek";
import PrayerViewWeek from "@/components/prayerView/week/PrayerViewWeek";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import PrayerViewDay from "./day/PrayerViewDay";

export default function PrayerViewTabs() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const defaultTab = localStorage.getItem("defaultTab") || "Day";

  const [selectedTab, _setSelectedTab] = useState(defaultTab);

  function setSelectedTab(tab: string) {
    localStorage.setItem("defaultTab", tab);
    _setSelectedTab(tab);
  }

  return (
    <div className="flex w-full flex-col px-2">
      <Tabs
        aria-label="Options"
        fullWidth
        color="primary"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        <Tab key="Day" title="Day">
          <DisplayDateDay date={date} setDate={setDate} />
          <PrayerViewDay date={date} />
        </Tab>
        <Tab key="Week" title="Week">
          <DisplayDateWeek date={date} setDate={setDate} />
          <PrayerViewWeek date={date} setDate={setDate} setSelectedTab={setSelectedTab} />
        </Tab>
        <Tab key="Month" title="Month">
          <DisplayDateMonth date={date} setDate={setDate} />
          <PrayerViewMonth date={date} setDate={setDate} setSelectedTab={setSelectedTab} />
        </Tab>
      </Tabs>
    </div>
  );
}
