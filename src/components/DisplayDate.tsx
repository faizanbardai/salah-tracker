"use client";
import { useEffect, useState } from "react";
const moment = require("moment-hijri");

export default function DisplayDate({ date }: { date: string }) {
  const [year, month, day] = date.split("-");
  const [gregorianDate, setGregorianDate] = useState<string>();
  const [hijriDate, setHijriDate] = useState<string>();

  useEffect(() => {
    const dateToUse = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    setGregorianDate(
      dateToUse.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setHijriDate(moment(dateToUse).format("iYYYY iMMMM iDD"));
  }, [year, month, day]);

  return (
    <div className="text-2xl text-center mb-1">
      {gregorianDate} <br />
      {hijriDate}
    </div>
  );
}
