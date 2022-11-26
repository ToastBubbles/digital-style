const {
  setLastButton,
  setDirection,
  bodySegments,
  setBodySegments,
  wormLength,
  width,
} = require("./store");

const direction = {
  up: -width,
  down: width,
  left: -1,
  right: 1,
};

function userInput() {
  document.addEventListener("keydown", (event) => {
    return event.key;
  });
}

function determineDirection() {
  const buttonString = userInput();

  switch (buttonString) {
    case "ArrowLeft":
      if (!(lastButton == "ArrowRight")) {
        setDirection(direction.left);
        setLastButton(buttonString);
      }
      break;
    case "ArrowRight":
      if (!(lastButton == "ArrowLeft")) {
        setDirection(direction.right);
        setLastButton(buttonString);
      }
      break;
    case "ArrowUp":
      if (!(lastButton == "ArrowDown")) {
        setDirection(direction.down);
        setLastButton(buttonString);
      }
      break;
    case "ArrowDown":
      if (!(lastButton == "ArrowUp")) {
        setDirection(direction.up);
        setLastButton(buttonString);
      }
      break;
    default:
      setDirection(setDirection.right);
  }
}

function changeDirection(newDirection) {
  let lastArraySeg = bodySegments[bodySegments.length - 1];
  const nextSegmentLocation = lastArraySeg + newDirection;

  //console.log(lastArraySeg % 40);
  if (newDirection == direction.right) {
    if (lastArraySeg % width == 0 && !nextSegmentLocation % width == 0) {
      setBodySegments([...bodySegments, nextSegmentLocation - width]);
    } else {
      setBodySegments([...bodySegments, nextSegmentLocation]);
    }
  } else if (newDirection == direction.left) {
    if (
      (lastArraySeg % width) - 1 == 0 &&
      !(lastArraySeg - newDirection) % width == 0
    ) {
      setBodySegments([...bodySegments, nextSegmentLocation + width]);
    } else {
      setBodySegments([...bodySegments, nextSegmentLocation]);
    }
  } else if (newDirection == direction.down) {
    if (nextSegmentLocation > maxPixels) {
      setBodySegments([...bodySegments, nextSegmentLocation - maxPixels]);
    } else {
      setBodySegments([...bodySegments, nextSegmentLocation]);
    }
  } else if (newDirection == direction.up) {
    if (nextSegmentLocation <= 0) {
      setBodySegments([...bodySegments, nextSegmentLocation + maxPixels]);
    } else {
      setBodySegments([...bodySegments, nextSegmentLocation]);
    }
  }

  if (bodySegments.length - 1 === wormLength) {
    document
      .querySelector(`.pixel:nth-child(${bodySegments[0]})`)
      .classList.remove("black");
    bodySegments.shift();
  }
}

module.exports.determineDirection = determineDirection;
