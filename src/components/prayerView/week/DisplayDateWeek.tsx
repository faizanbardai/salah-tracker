"use client";
const moment = require("moment-hijri");
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { getStartAndEndOfWeek } from "@/utils/getStartAndEndOfWeek";
import { HijriDateContext } from "@/providers/HijriDateProvider";

type DisplayDateWeekProps = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};
export const DisplayDateWeek = ({ date, setDate }: DisplayDateWeekProps) => {
  const { showHijriDate, setShowHijriDate } = useContext(HijriDateContext);
  const [start, end] = getStartAndEndOfWeek(date);

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
