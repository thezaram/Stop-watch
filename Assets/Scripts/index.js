//global variables
let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;

// DOM elements
let resetBtn = document.getElementById('resetBtn'); //clear button
let display = document.querySelector('.stop-watch-display'); // Time display
let toggleBtn = document.getElementById('toggleBtn'); // Start/Stop button
let lapBtn = document.getElementById('lapBtn'); // Lap button
let lapsContainer = document.getElementById('laps'); // Laps list

//Core Functions ----|

// Function to start the stopwatch
function startStopwatch() {
  startTime = new Date().getTime() - difference; // resume
  tInterval = setInterval(getShowTime, 1);
  running = true;
  toggleBtn.innerText = "Stop";
}

//Function to stop the stopwatch
function stopStopwatch() {
  clearInterval(tInterval);
  running = false;
  toggleBtn.innerText = "Start";
}

// Function to reset the stopwatch
function resetStopwatch() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.innerHTML = '00:00:00:000';
  toggleBtn.innerText = "Start/Stop";
  lapsContainer.innerHTML = ""; // clear laps
}

// Function to update the displayed time
function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000));

  display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

// Function to pad numbers with leading zeros
function pad(number, digits = 2) {
  return number.toString().padStart(digits, '0');
}

//  Button Event Listerners
toggleBtn.addEventListener('click', function () {
  if (!running) {
    startStopwatch();
  } else {
    stopStopwatch();
  }
});

//  reset
resetBtn.addEventListener('click', function () {
  resetStopwatch();
});

// laps
lapBtn.addEventListener('click', function () {
  if (running) {
    let lapTime = display.innerHTML;
    let li = document.createElement("li");
    li.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    li.style.color = "white";
    lapsContainer.appendChild(li);
  }
});
// The lap button only works only when the stopwatch is running.