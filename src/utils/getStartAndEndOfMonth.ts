export default function getStartAndEndOfMonth(date: string) {
  const startOfMonthDate = new Date(date);
  startOfMonthDate.setDate(1);
  const startOfMonth = startOfMonthDate.toISOString().slice(0, 10);

  const endOfMonthDate = new Date(date);
  endOfMonthDate.setMonth(endOfMonthDate.getMonth() + 1);
  endOfMonthDate.setDate(0);
  const endOfMonth = endOfMonthDate.toISOString().slice(0, 10);

  return [startOfMonth, endOfMonth];
}
