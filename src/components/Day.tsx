var moment = require("moment-hijri");

export default function Day() {
  const date = new Date();
  const displayDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const hijriDate = moment(date).format("iYYYY iMMMM iDD ");
  return (
    <div className="m-2">
      <div className="text-2xl text-center">
        {displayDate} <br />
        {hijriDate}
      </div>
    </div>
  );
}
