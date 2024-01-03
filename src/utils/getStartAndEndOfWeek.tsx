export function getStartAndEndOfWeek(date: string) {
  const day = new Date(date).getDay();
  const diff = new Date(date).getDate() - day + (day === 0 ? -6 : 1);
  const startOfWeek = new Date(new Date(date).setDate(diff)).toISOString().slice(0, 10);
  const endOfWeek = new Date(new Date(date).setDate(diff + 6)).toISOString().slice(0, 10);
  return [startOfWeek, endOfWeek];
}
