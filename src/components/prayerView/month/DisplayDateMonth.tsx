"use client";
const moment = require("moment-hijri");
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { HijriDateContext } from "@/providers/HijriDateProvider";

type DisplayDateMonthProps = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};
export default function DisplayDateMonth({ date, setDate }: DisplayDateMonthProps) {
  const { showHijriDate, setShowHijriDate } = useContext(HijriDateContext);

  const gregorianDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  const hijriDate = moment(date).format("iYYYY iMMMM");

  function handleClick() {
    setShowHijriDate(!showHijriDate);
  }
  function redirectToPreviousMonth() {
    const previousMonth = new Date(date);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setDate(previousMonth.toISOString().slice(0, 10));
  }
  function redirectToNextMonth() {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setDate(nextMonth.toISOString().slice(0, 10));
  }
  return (
    <div className="flex justify-between pb-3">
      <Button isIconOnly color="success">
        <MdNavigateBefore size="25" onClick={redirectToPreviousMonth} />
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
        <MdOutlineNavigateNext size="25" onClick={redirectToNextMonth} />
      </Button>
    </div>
  );
}
