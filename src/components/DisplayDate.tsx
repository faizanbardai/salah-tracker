"use client";
const moment = require("moment-hijri");
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export default function DisplayDate({ date }: { date: string }) {
  const router = useRouter();

  const [year, month, day] = date.split("-");
  const dateToUse = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );

  const gregorianDate = dateToUse.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hijriDate = moment(dateToUse).format("iYYYY iMMMM iDD");

  const [dateToDisplay, setDateToDisplay] = useState(gregorianDate);

  function handleClick() {
    if (dateToDisplay === gregorianDate) {
      setDateToDisplay(hijriDate);
    } else {
      setDateToDisplay(gregorianDate);
    }
  }

  function redirectToYesterday() {
    const yesterday = new Date(dateToUse);
    yesterday.setDate(yesterday.getDate() - 1);
    redirectToDate(yesterday);
  }

  function redirectToTomorrow() {
    const tomorrow = new Date(dateToUse);
    tomorrow.setDate(tomorrow.getDate() + 1);
    redirectToDate(tomorrow);
  }

  function redirectToDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    router.push(`/prayer/${year}-${month}-${day}`);
  }

  return (
    <div className="flex justify-between pb-3">
      <Button isIconOnly color="success">
        <MdNavigateBefore size="25" onClick={redirectToYesterday} />
      </Button>
      <Button
        variant="solid"
        color="secondary"
        fullWidth
        className="flex-auto mx-2"
        onClick={handleClick}
      >
        {dateToDisplay}
      </Button>
      <Button isIconOnly color="success">
        <MdOutlineNavigateNext size="25" onClick={redirectToTomorrow} />
      </Button>
    </div>
  );
}
