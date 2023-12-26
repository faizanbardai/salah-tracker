"use client";
import { useEffect, useState } from "react";
const moment = require("moment-hijri");

export default function DisplayDate() {
  const [date, setDate] = useState<string>();
  const [hijriDate, setHijriDate] = useState<string>();

  useEffect(() => {
    const today = new Date();
    setDate(
      today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setHijriDate(moment(today).format("iYYYY iMMMM iDD"));
  }, []);

  return (
    <div className="text-2xl text-center mb-1">
      {date} <br />
      {hijriDate}
    </div>
  );
}
