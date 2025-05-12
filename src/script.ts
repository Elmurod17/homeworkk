// State variables
let timer: number = 0;
let interval: number | null = null;
let isRunning: boolean = false;
let currentSpeed: number = 0;
let totalDistance: number = 0;
let currentSessionDistance: number = 0;
let calories: number = 0;
let steps: number = 0;

// DOM elements
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

// Event listeners
startButton.addEventListener("click", startTracker);
stopButton.addEventListener("click", stopTracker);
resetButton.addEventListener("click", resetTracker);

// Format time as MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Update all displayed metrics
function updateDisplay(): void {
  timeElement.textContent = formatTime(timer);
  speedElement.textContent = currentSpeed.toFixed(1);
  totalDistanceElement.textContent = totalDistance.toFixed(2);
  currentDistanceElement.textContent = currentSessionDistance.toFixed(2);
  caloriesElement.textContent = Math.floor(calories).toString();
  stepsElement.textContent = Math.floor(steps).toString();
}

// Main tracker function
function track(): void {
  timer++;

  // Simulate gradual speed increase when starting
  if (isRunning && currentSpeed < 6.0) {
    currentSpeed += 0.1;
  }

  // Calculate distance (speed in km/h divided by 3600 for km per second)
  const distanceIncrement = currentSpeed / 3600;
  totalDistance += distanceIncrement;
  currentSessionDistance += distanceIncrement;

  // Calculate calories (simplified formula)
  calories += currentSpeed * 0.5;

  // Calculate steps (approx 1300 steps per km at average speed)
  steps += distanceIncrement * 1300;

  updateDisplay();
}

// Start the tracker
function startTracker(): void {
  if (!isRunning) {
    isRunning = true;
    interval = window.setInterval(track, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
  }
}

// Stop the tracker with gradual speed decrease
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

// Reset all metrics
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

// Initialize display
updateDisplay();
stopButton.disabled = true;
