let wormLength = 3;
function setWormLength(newVal) {
  wormLength = newVal;
}

let lastButton = null;
function setLastButton(newVal) {
  lastButton = newVal;
}

let direction = 1;
function setDirection(newVal) {
  direction = newVal;
}

let wormSpeed = 100; //higher = slower
function setWormSpeed(newVal) {
  wormSpeed = newVal;
}

let maxWormSpeed = 30;
function setMaxWormSpeed(newVal) {
  maxWormSpeed = newVal;
}

let width = 40;
function setWidth(newVal) {
  width = newVal;
}

let maxPixels = width * width;
function setMaxPixels(newVal) {
  maxPixels = newVal;
}

let bodySegments = [724];
function setBodySegments(newVal) {
  bodySegments = newVal;
}

let mainGrid = document.getElementById("main_grid");
function setMainGrid(newVal) {
  mainGrid = newVal;
}

let failcheck = false;
function setFailCheck(newVal) {
  failcheck = newVal;
}

let score = 0;
function setScore(newVal) {
  score = newVal;
}

module.exports.store = {
  wormLength,
  setWormLength,
  lastButton,
  setLastButton,
  direction,
  setDirection,
  wormSpeed,
  setWormSpeed,
  maxWormSpeed,
  setMaxWormSpeed,
  width,
  setWidth,
  maxPixels,
  setMaxPixels,
  bodySegments,
  setBodySegments,
  mainGrid,
  setMainGrid,
  failcheck,
  setFailCheck,
  score,
  setScore,
};
