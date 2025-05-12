let timer: number = 0;
let interval: number | null = null;
let isRunning: boolean = false;
let currentSpeed: number = 0;
let totalDistance: number = 0;
let currentSessionDistance: number = 0;
let calories: number = 0;
let steps: number = 0;

const timeElement = document.getElementById("time") as HTMLElement;
const speedElement = document.getElementById("speed") as HTMLElement;
const totalDistanceElement = document.getElementById(
  "total-distance"
) as HTMLElement;
const currentDistanceElement = document.getElementById(
  "current-distance"
) as HTMLElement;
const caloriesElement = document.getElementById("calories") as HTMLElement;
const stepsElement = document.getElementById("steps") as HTMLElement;
const startButton = document.getElementById("start-btn") as HTMLButtonElement;
const stopButton = document.getElementById("stop-btn") as HTMLButtonElement;
const resetButton = document.getElementById("reset-btn") as HTMLButtonElement;

startButton.addEventListener("click", startTracker);
stopButton.addEventListener("click", stopTracker);
resetButton.addEventListener("click", resetTracker);

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
function updateDisplay(): void {
  timeElement.textContent = formatTime(timer);
  speedElement.textContent = currentSpeed.toFixed(1);
  totalDistanceElement.textContent = totalDistance.toFixed(2);
  currentDistanceElement.textContent = currentSessionDistance.toFixed(2);
  caloriesElement.textContent = Math.floor(calories).toString();
  stepsElement.textContent = Math.floor(steps).toString();
}
function track(): void {
  timer++;

  if (isRunning && currentSpeed < 6.0) {
    currentSpeed += 0.1;
  }
  const distanceIncrement = currentSpeed / 3600;
  totalDistance += distanceIncrement;
  currentSessionDistance += distanceIncrement;
  calories += currentSpeed * 0.5;

  steps += distanceIncrement * 1300;

  updateDisplay();
}

function startTracker(): void {
  if (!isRunning) {
    isRunning = true;
    interval = window.setInterval(track, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
  }
}

function stopTracker(): void {
  if (isRunning) {
    isRunning = false;

    const speedDecreaseInterval = window.setInterval(() => {
      if (currentSpeed > 0) {
        currentSpeed = Math.max(0, currentSpeed - 0.5);
        updateDisplay();
      } else {
        window.clearInterval(speedDecreaseInterval);
        if (interval) {
          window.clearInterval(interval);
          interval = null;
        }
        startButton.disabled = false;
      }
    }, 200);

    stopButton.disabled = true;
  }
}

function resetTracker(): void {
  if (interval) {
    window.clearInterval(interval);
    interval = null;
  }

  timer = 0;
  currentSpeed = 0;
  totalDistance = 0;
  currentSessionDistance = 0;
  calories = 0;
  steps = 0;
  isRunning = false;

  updateDisplay();
  startButton.disabled = false;
  stopButton.disabled = true;
}

updateDisplay();
stopButton.disabled = true;
