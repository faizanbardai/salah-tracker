const moment = require("moment-hijri");
import dayjs from "dayjs";

export default function getStartAndEndOfMonth(date: string, showHijriDate: boolean): string[] {
  const newDate = dayjs(date);
  let startOfMonth = newDate.startOf("month");
  if (showHijriDate) startOfMonth = dayjs(moment(date).startOf("iMonth").format());

  let endOfMonth = newDate.endOf("month");
  if (showHijriDate) endOfMonth = dayjs(moment(date).endOf("iMonth").format());

  return [startOfMonth.format("YYYY-MM-DD"), endOfMonth.format("YYYY-MM-DD")];
}
