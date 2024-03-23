const moment = require("moment-hijri");
import dayjs from "dayjs";

export default function isSameMonth(
  date1: string = new Date().toISOString(),
  date2: string = new Date().toISOString(),
  showHijriDate: boolean = false
) {
  return showHijriDate
    ? moment(date1).iMonth() === moment(date2).iMonth()
    : dayjs(date1).format("MM") === dayjs(date2).format("MM");
}
