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

let srcToFile = function(src) {
  let byteString = atob(src.split(",")[1]);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  let blob = new Blob([ia], { type: "image/jpeg" });
  let file = new File([blob], "image.jpg");
  return file;
}

export { dateAsString, escapeAuthor, srcToFile };
