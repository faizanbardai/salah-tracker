"use client";
const moment = require("moment-hijri");
import { HijriDateContext } from "@/providers/HijriDateProvider";
import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useContext } from "react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

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
    setDate(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"));
  }

  function redirectToTomorrow() {
    setDate(dayjs(date).add(1, "day").format("YYYY-MM-DD"));
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
