const mainBg = document.querySelector(".main");
const header = document.querySelector("h3");
const button = document.querySelector(".btn");
const Time = document.querySelector(".Time");
const playBtn = document.querySelector(".play_btn");
const pauseBtn = document.querySelector(".pause_btn");
const ResetBtn = document.querySelector(".reset");

let startTime;
let elapsedTime = 0;
let timerInterval;
let timerisON = 0;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  // let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
  document.querySelector(".Time").innerHTML = txt;
}

function showReset() {
  ResetBtn.style.opacity = "100%";
  ResetBtn.style.cursor = "pointer";
}

function hideReset() {
  ResetBtn.style.opacity = "0%";
  ResetBtn.style.cursor = "default";
}

const changeBg = () => {
  mainBg.classList.toggle("main_count");
  button.classList.toggle("main_count");
};

const switchBtn = () => {
  playBtn.classList.toggle("non_active");
  pauseBtn.classList.toggle("non_active");
};

const start = () => {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  switchBtn();
  showReset();
  timerisON = 1;
};

const pause = () => {
  clearInterval(timerInterval);
  switchBtn();
  timerisON = 0;
};

button.addEventListener("click", function () {
  changeBg();
  if (!timerisON) {
    start();
  } else {
    pause();
  }

  // pauseBtn.classList.remove("non_active");
});

ResetBtn.addEventListener("click", function () {
  if (timerisON) {
    changeBg();
    pause();
  }
  hideReset();
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
  timerisON = 0;
});
