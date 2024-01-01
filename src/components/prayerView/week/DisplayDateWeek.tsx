"use client";
const moment = require("moment-hijri");
import { Dispatch, SetStateAction, useState } from "react";
import { getStartAndEndOfWeek } from "@/utils/getStartAndEndOfWeek";
import { Button } from "@nextui-org/react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

type DisplayDateWeekProps = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  start: string;
  end: string;
};
export const DisplayDateWeek = ({ start, end, date, setDate }: DisplayDateWeekProps) => {
  const [showHijriDate, setShowHijriDate] = useState(
    localStorage.getItem("showHijriDate") === "true"
  );

  const gregorianDateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const gregorianDate = `
  ${new Date(start).toLocaleDateString("en-US", gregorianDateOptions)} 
  -
  ${new Date(end).toLocaleDateString("en-US", gregorianDateOptions)}`;
  const hijriDate = `${moment(start).format("iMMMM iDD")} - ${moment(end).format("iMMMM iDD")}`;
  function handleClick() {
    setShowHijriDate(!showHijriDate);
    localStorage.setItem("showHijriDate", String(!showHijriDate));
  }
  return (
    <div className="flex justify-between pb-3">
      <Button isIconOnly color="success">
        <MdNavigateBefore size="25" />
      </Button>
      <Button
        variant="solid"
        color="secondary"
        fullWidth
        className="flex-auto mx-2"
        onClick={handleClick}
      >
        {showHijriDate ? hijriDate : gregorianDate}
      </Button>
      <Button isIconOnly color="success">
        <MdOutlineNavigateNext size="25" />
      </Button>
    </div>
  );
};
