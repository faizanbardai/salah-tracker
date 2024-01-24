"use client";
const moment = require("moment-hijri");
import { Dispatch, SetStateAction, useContext } from "react";
import { Button } from "@nextui-org/react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { HijriDateContext } from "@/providers/HijriDateProvider";

type DisplayDateProps = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};
export default function DisplayDateDay({ date, setDate }: DisplayDateProps) {
  const { showHijriDate, setShowHijriDate } = useContext(HijriDateContext);
  const gregorianDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hijriDate = moment(date).format("iYYYY iMMMM iDD");

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
