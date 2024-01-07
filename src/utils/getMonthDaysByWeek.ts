import dayjs from "dayjs";

export default function getMonthDaysByWeek(date: string) {
  const newDate = dayjs(date);
  let firstOfMonth = newDate.startOf("month").day(0).add(1, "day");

  const lastOfMonth = newDate.endOf("month").day(6).add(1, "day");

  const weeks: string[][] = [];
  let week: string[] = [];
  while (firstOfMonth.isBefore(lastOfMonth)) {
    week.push(firstOfMonth.format("YYYY-MM-DD"));
    firstOfMonth = firstOfMonth.add(1, "day");
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  return weeks;
}
