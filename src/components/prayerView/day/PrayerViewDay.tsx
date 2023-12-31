"use client";
import PrayerRow from "@/components/prayerView/day/PrayerRow";
import { getPrayers } from "@/enum/Prayers";
import { PrayerDay } from "@/types/prayerDay";
import { useState } from "react";
import useSWR from "swr";

type PrayerViewDayProps = {
  date: string;
};
export default function PrayerViewDay({ date }: PrayerViewDayProps) {
  const fetcher = (url: string): Promise<PrayerDay> => fetch(url).then((res) => res.json());
  const {
    data: userPrayerDay,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/prayers?date=${date}`, fetcher);

  const prayers = getPrayers();

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!userPrayerDay) return <p>Failed to load</p>;
  return prayers.map((prayer) => {
    const userPrayerStatus = userPrayerDay[prayer];

    return (
      <PrayerRow
        key={prayer}
        date={date}
        prayer={prayer}
        userPrayerStatus={userPrayerStatus}
        mutate={mutate}
      />
    );
  });
}
