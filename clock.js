const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("#js-title");

function checkTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

function getTime() {
  const date = new Date();
  const hour = checkTime(date.getHours());
  const minute = checkTime(date.getMinutes());
  const sec = checkTime(date.getSeconds());

  clockTitle.innerText = `${hour}:${minute}:${sec}`;
}

function runClock() {
  const sec = 1000;
  getTime();
  setInterval(getTime, sec);
}

runClock();


