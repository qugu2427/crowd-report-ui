const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Dec",
];

let dateAsString = function(timestamp) {
  let d = new Date(timestamp);
  d.setTime(d.getTime()+d.getTimezoneOffset()*60*1000);
  if (isNaN(d.getTime())) {
    return "Unknown Date";
  }
  let hour = d.getHours();
  let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  let period = "AM"
  if(hour > 12){
    hour -= 12;
    period = "PM";
  }
  return `${
    months[d.getMonth()]
  } ${d.getDate()} ${d.getFullYear()}, ${hour}:${minutes} ${period}`;
};

export { dateAsString };
