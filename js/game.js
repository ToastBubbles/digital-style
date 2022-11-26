const {
  maxPixels,
  direction,
  wormSpeed,
  maxWormSpeed,
  bodySegments,
  failcheck,
  setFailcheck,
  mainGrid,
  setMainGrid,
} = require("./store");
const { determineDirection } = require("./controls");
const { generatePixels } = require("./screen");
const numberToText = require("number-to-text");

console.log({
  maxPixels,
  direction,
  wormSpeed,
  maxWormSpeed,
  bodySegments,
  failcheck,
  setFailcheck,
  mainGrid,
  setMainGrid,
});

function initialSetup() {
  setMainGrid({ ...mainGrid, innerHTML: generatePixels(maxPixels) });
  generatePellet();
  updateScore();
}

function generatePellet() {
  let newPos = Math.floor(Math.random() * maxPixels);
  if (
    document
      .querySelector(`.pixel:nth-child(${newPos})`)
      .classList.contains("black")
  ) {
    generatePellet();
  } else {
    document
      .querySelector(`.pixel:nth-child(${newPos})`)
      .classList.add("pellet");
  }
}

function fail() {
  setFailcheck(true);
  document.querySelector(
    `.pixel:nth-child(${maxPixels / 2 - width / 2 - 3})`
  ).innerHTML = "F";
  document.querySelector(
    `.pixel:nth-child(${maxPixels / 2 - width / 2 - 2})`
  ).innerHTML = "A";
  document.querySelector(
    `.pixel:nth-child(${maxPixels / 2 - width / 2 - 1})`
  ).innerHTML = "I";
  document.querySelector(
    `.pixel:nth-child(${maxPixels / 2 - width / 2})`
  ).innerHTML = "L";
  document.querySelector(
    `.pixel:nth-child(${maxPixels / 2 - width / 2 + 1})`
  ).innerHTML = "E";
  document.querySelector(
    `.pixel:nth-child(${maxPixels / 2 - width / 2 + 2})`
  ).innerHTML = "D";
}

function updateScore() {
  if (!failcheck) {
    document.getElementById("scoreText").innerHTML =
      numberToText.convertToText(score);
  }
}

function wormUpdate() {
  const lastBodySegment = bodySegments[bodySegments.length - 1];

  if (
    document
      .querySelector(`.pixel:nth-child(${lastBodySegment})`)
      .classList.contains("black")
  ) {
    fail();
  } else if (
    document
      .querySelector(`.pixel:nth-child(${lastBodySegment})`)
      .classList.contains("pellet")
  ) {
    console.log("i eated a peller");
    score += 50;
    document
      .querySelector(`.pixel:nth-child(${lastBodySegment})`)
      .classList.remove("pellet");
    wormLength++;
    if (!(wormSpeed <= maxWormSpeed)) {
      wormSpeed--;
    }
    generatePellet();
    updateScore();
  }

  bodySegments.forEach((seg) => {
    document.querySelector(`.pixel:nth-child(${seg})`).classList.add("black");
  });

  determineDirection();

  changeDirection(direction);

  if (!failcheck) {
    setTimeout(() => {
      wormUpdate();
    }, wormSpeed);
  }
}

module.exports.initialSetup = initialSetup;
module.exports.wormUpdate = wormUpdate;
