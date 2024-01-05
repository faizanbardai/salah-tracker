"use client";
const moment = require("moment-hijri");
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

type DisplayDateWeekProps = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  start: string;
  end: string;
};
export const DisplayDateWeek = ({ start, end, date, setDate }: DisplayDateWeekProps) => {
  const [showHijriDate, setShowHijriDate] = useState(false);

  useEffect(() => {
    setShowHijriDate(localStorage.getItem("showHijriDate") === "true");
  }, []);

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
  function redirectToLastWeek() {
    const endOfLastWeek = new Date(start);
    endOfLastWeek.setDate(endOfLastWeek.getDate() - 1);
    setDate(endOfLastWeek.toISOString().slice(0, 10));
  }
  function redirectToNextWeek() {
    const startOfNextWeek = new Date(end);
    startOfNextWeek.setDate(startOfNextWeek.getDate() + 1);
    setDate(startOfNextWeek.toISOString().slice(0, 10));
  }

  return (
    <div className="flex justify-between pb-3">
      <Button isIconOnly color="success">
        <MdNavigateBefore size="25" onClick={redirectToLastWeek} />
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
        <MdOutlineNavigateNext size="25" onClick={redirectToNextWeek} />
      </Button>
    </div>
  );
};
