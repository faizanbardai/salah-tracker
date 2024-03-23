const moment = require("moment-hijri");
import dayjs from "dayjs";

// 0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday

export default function getMonthDaysByWeek(date: string, showHijriDate: boolean): string[][] {
  const newDate = dayjs(date);
  let start = newDate.startOf("month");
  if (showHijriDate) start = dayjs(moment(date).startOf("iMonth").format());

  switch (start.day()) {
    case 0: // Sunday
      start = start.subtract(1, "day").startOf("week").add(1, "day");
      break;
    case 1: // Monday
      break;
    default: // Tuesday, Wednesday, Thursday, Friday, Saturday
      start = start.startOf("week").add(1, "day");
  }

  let end = newDate.endOf("month");
  if (showHijriDate) end = dayjs(moment(date).endOf("iMonth").format());

  switch (end.day()) {
    case 0: // Sunday
      break;
    default: // Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
      end = end.endOf("week").add(1, "day");
  }

  const weeks: string[][] = [];
  let week: string[] = [];
  do {
    week.push(start.format("YYYY-MM-DD"));
    start = start.add(1, "day");
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  } while (start.isBefore(end));

  return weeks;
}
