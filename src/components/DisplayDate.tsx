"use client";
const moment = require("moment-hijri");
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@nextui-org/react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

type DisplayDateProps = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};
export default function DisplayDate({ date, setDate }: DisplayDateProps) {
  const gregorianDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hijriDate = moment(date).format("iYYYY iMMMM iDD");

  const [showHijriDate, setShowHijriDate] = useState(
    localStorage.getItem("showHijriDate") === "true"
  );

  function redirectToYesterday() {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    setDate(yesterday.toISOString().slice(0, 10));
  }

  function redirectToTomorrow() {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().slice(0, 10));
  }

  function handleClick() {
    setShowHijriDate(!showHijriDate);
    localStorage.setItem("showHijriDate", String(!showHijriDate));
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
        {showHijriDate ? hijriDate : gregorianDate}
      </Button>
      <Button isIconOnly color="success">
        <MdOutlineNavigateNext size="25" onClick={redirectToTomorrow} />
      </Button>
    </div>
  );
}
