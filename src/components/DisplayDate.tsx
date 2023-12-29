"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
const moment = require("moment-hijri");
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export default function DisplayDate({ date }: { date: string }) {
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

  return (
    <div className="flex justify-between mb-2">
      <Button isIconOnly>
        <MdNavigateBefore size="25" />
      </Button>
      <Button
        variant="bordered"
        fullWidth
        className="flex-auto mx-2"
        onClick={handleClick}
      >
        {dateToDisplay}
      </Button>
      <Button isIconOnly>
        <MdOutlineNavigateNext size="25" />
      </Button>
    </div>
  );
}
