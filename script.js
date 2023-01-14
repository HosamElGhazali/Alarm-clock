const currentTime = document.querySelector("h1"),
  content = document.querySelector(".content"),
  selectList = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector("button");
let alarmTime;
let isAlarmSet = false;
let ring = new Audio("./audio/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectList[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectList[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectList[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    seconds = date.getSeconds(),
    ampm = "AM";

  if (hour >= 12) {
    hour = hour - 12;
    ampm = "PM";
  }

  // if hour value is 0 => set this value to 12.
  hour = hour == 0 ? (hour = 12) : hour;

  // adding 0 before hour, minute, seconds if this value is less than 10.
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  currentTime.innerText = `${hour}:${minute}:${seconds} ${ampm}`;

  if (alarmTime == `${hour}:${minute} ${ampm}`) {
    ring.play();
    ring.loop = true;
  }
}, 1000);

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ring.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set ALarm";
    return (isAlarmSet = false);
  }
  let time = `${selectList[0].value}:${selectList[1].value} ${selectList[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Select a valid time to set Alarm.");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear ALarm";
}

setAlarmBtn.addEventListener("click", setAlarm);
