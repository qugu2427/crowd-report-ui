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

let escapeAuthor = function(author){
  let newStr = "";
  for(let i = 0;i < author.length;i++){
    if(author.charCodeAt(i) > 255){
      newStr += "_";
    } else {
      newStr += author.charAt(i);
    }
  }
  return newStr;
}

let srcToFile = async function(src) {
  let res = await fetch(src);
  let contentType = res.headers.get('content-type');
  let blob = await res.blob();
  return new File([blob], src, { contentType });
}

export { dateAsString, escapeAuthor, srcToFile };
