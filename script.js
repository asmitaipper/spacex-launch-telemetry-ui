// Simple fake telemetry simulation

let tMinusSeconds = 10 * 60; // 10 minutes
let altitude = 0;
let velocity = 0;
let stage = 1;
let fuel = 100;

// DOM references
const timeEl = document.getElementById("timeToLaunch");
const altitudeEl = document.getElementById("altitude");
const velocityEl = document.getElementById("velocity");
const stageEl = document.getElementById("stage");
const fuelEl = document.getElementById("fuel");
const logEl = document.getElementById("eventLog");

function formatT(seconds) {
  const sign = seconds >= 0 ? "-" : "+";
  const abs = Math.abs(seconds);
  const m = String(Math.floor(abs / 60)).padStart(2, "0");
  const s = String(abs % 60).padStart(2, "0");
  return `${sign}00:${m}:${s}`;
}

function appendEvent(message) {
  const li = document.createElement("li");
  const currentT = formatT(tMinusSeconds);
  li.textContent = `[T${currentT}] ${message}`;
  logEl.prepend(li);
}

// Countdown / timeline
setInterval(() => {
  tMinusSeconds -= 1;
  timeEl.textContent = formatT(tMinusSeconds);

  // Simulate profile
  if (tMinusSeconds === 120) {
    appendEvent("Propellant loading complete.");
  }
  if (tMinusSeconds === 60) {
    appendEvent("Range is GO.");
  }
  if (tMinusSeconds === 10) {
    appendEvent("Engine chill started.");
  }
  if (tMinusSeconds === 0) {
    appendEvent("Liftoff! Vehicle has cleared the pad.");
  }
  if (tMinusSeconds === -30) {
    appendEvent("Max-Q reached.");
  }
  if (tMinusSeconds === -120 && stage === 1) {
    stage = 2;
    stageEl.textContent = stage;
    appendEvent("MECO and Stage 1 separation. Stage 2 ignition.");
  }

  // Telemetry evolution after liftoff
  if (tMinusSeconds <= 0) {
    altitude += 3.2; // km
    velocity += 250; // m/s
    fuel = Math.max(0, fuel - 0.4);

    altitudeEl.textContent = `${altitude.toFixed(1)} km`;
    velocityEl.textContent = `${velocity.toFixed(0)} m/s`;
    fuelEl.textContent = `${fuel.toFixed(0)}%`;
  }
}, 1000);
