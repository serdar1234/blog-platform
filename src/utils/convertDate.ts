export default function convertDate(d: string): string {
  const day: Date = new Date(d);
  enum Months {
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  }

  return `${Months[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`;
}
