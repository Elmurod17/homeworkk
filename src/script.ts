let time = 0;
let speed = 1;
let distance = 0;
let calories = 0;
let steps = 0;
let intId: number | undefined;

function getDistanceInMetrSecond(speed: number): number {
  return +(speed / 3.6).toFixed(1);
}

function getKcall(distance: number) {
  return Math.round(70 * 0.0005 * distance);
}

const onStart = () => {
  if (!intId) {
    intId = setInterval(() => {
      time++;
      distance = distance + getDistanceInMetrSecond(speed);
      distance = +distance.toFixed(1);
      steps = Math.trunc(distance * 2);
      calories = getKcall(distance);
      updateFrontend();
      console.log(time, distance, steps, calories);
    }, 1000);
  }
};

const onStop = () => {
  clearInterval(intId);
  intId = undefined;
};

const onReset = () => {
  clearInterval(intId);
  intId = undefined;
  time = 0;
  distance = 0;
  steps = 0;
  calories = 0;
  speed = 1;
  updateFrontend();
  (document.querySelector(".speed-range") as any).value = "10";
};

function updateFrontend() {
  document.querySelector(".time")!.textContent = formatTime(time);
  document.querySelector(".distance")!.textContent = (distance / 1000).toFixed(
    2
  );
  document.querySelector(".calories")!.textContent = calories.toString();
  document.querySelector(".steps")!.textContent = steps.toString();
  document.querySelector(".speed")!.textContent = (speed / 10).toString();
}

function formatTime(second: number): string {
  let minute = Math.trunc(second / 60);
  second = second - minute * 60;

  let time = "0.00";
  time = `${minute}:${second < 10 ? `0${second}` : second}`;
  return time;
}

document.querySelector(".speed-range")?.addEventListener("input", (e: any) => {
  const inputValue = e.target?.value;
  speed = inputValue;
});
