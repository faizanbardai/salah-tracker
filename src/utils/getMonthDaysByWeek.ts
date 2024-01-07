import dayjs from "dayjs";

// 0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday

export default function getMonthDaysByWeek(date: string): string[][] {
  const newDate = dayjs(date);
  let firstOfMonth = newDate.startOf("month");
  if (firstOfMonth.day() !== 1) {
    firstOfMonth = firstOfMonth.day(0);
    firstOfMonth = firstOfMonth.add(1, "day");
  }

  let lastOfMonth = newDate.endOf("month");
  if (lastOfMonth.day() !== 0) {
    lastOfMonth = lastOfMonth.day(6);
    lastOfMonth = lastOfMonth.add(1, "day");
  }

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
