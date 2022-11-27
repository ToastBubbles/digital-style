const numberToText = require("number-to-text");
require("number-to-text/converters/en-us");

let wormLength = 3;
let wormSpeed = 150; //higher = slower
let maxWormSpeed = 30;
let width = 40;
let maxPixels = width * width;
let bodySegments = [724];
let mainGrid = document.getElementById("main_grid");
let failcheck = false;
let score = 0;

let hungerLevel = 100;

let pelletPos = 0;

let enemySegments = [1234];
let enemyWormLength = 6;

function main() {
  mainGrid.innerHTML = generatePixels(maxPixels);

  setTimeout(() => {
    wormUpdate();
    enemyWorm();
    hungerDecay();
  }, "10");
}

let buttonString = "ArrowRight";

function userInput() {
  document.addEventListener("keydown", (event) => {
    //console.log(`key=${event.key},code=${event.code}`);
    buttonString = event.key;
  });
} //test

function generatePixels(pixelCount) {
  let htmlString = "";
  let trackerNum = 1;
  let whiteArray = [
    /*371, 372, 373, 374, 375, 386, 387, 388, 389, 390, 410, 411, 412, 413, 414,
    415, 416, 425, 426, 427, 428, 429, 430, 431, 450, 451, 452, 453, 454, 455,
    456, 465, 466, 467, 468, 469, 470, 471, 490, 491, 492, 493, 494, 495, 496,
    505, 506, 507, 508, 509, 510, 511, 530, 531, 532, 533, 534, 535, 546, 547,
    547, 548, 549, 550, 551, 571, 572, 573, 574, 587, 588, 589, 590,*/
  ];
  for (var i = 0; i < pixelCount; i++) {
    if (whiteArray.includes(trackerNum)) {
      // htmlString += `<div class="pixel white">${trackerNum}</div>`;
      htmlString += `<div class="pixel white"></div>`;
    } else {
      //htmlString += `<div class="pixel">${trackerNum}</div>`;
      htmlString += `<div class="pixel"></div>`;
    }

    trackerNum++;
  }

  return htmlString;
}
let lastButton = "";
let direction = 1;

function wormUpdate() {
  if (
    document
      .querySelector(
        `.pixel:nth-child(${bodySegments[bodySegments.length - 1]})`
      )
      .classList.contains("black") ||
    document
      .querySelector(
        `.pixel:nth-child(${bodySegments[bodySegments.length - 1]})`
      )
      .classList.contains("enemy")
  ) {
    fail();
  } else if (
    document
      .querySelector(
        `.pixel:nth-child(${bodySegments[bodySegments.length - 1]})`
      )
      .classList.contains("pellet")
  ) {
    console.log("i eated a peller");
    hungerLevel += 14;
    if (hungerLevel > 100) {
      hungerLevel = 100;
    }
    readWord("cronch", 2, 0.9);
    score += 50;
    document
      .querySelector(
        `.pixel:nth-child(${bodySegments[bodySegments.length - 1]})`
      )
      .classList.remove("pellet");
    wormLength++;
    if (!(wormSpeed <= maxWormSpeed)) {
      wormSpeed--;
    }
    generatePellet();
  }

  bodySegments.forEach((seg) => {
    document.querySelector(`.pixel:nth-child(${seg})`).classList.add("black");
  });

  switch (buttonString) {
    case "ArrowLeft":
      if (!(lastButton == "ArrowRight")) {
        direction = -1;
        lastButton = buttonString;
      }
      break;
    case "ArrowRight":
      if (!(lastButton == "ArrowLeft")) {
        direction = 1;
        lastButton = buttonString;
      }
      break;
    case "ArrowUp":
      if (!(lastButton == "ArrowDown")) {
        direction = -width;
        lastButton = buttonString;
      }
      break;
    case "ArrowDown":
      if (!(lastButton == "ArrowUp")) {
        direction = width;
        lastButton = buttonString;
      }
      break;
    default:
      direction = 1;
  }

  changeDirection(direction, bodySegments, wormLength, "player");

  if (!failcheck) {
    setTimeout(() => {
      wormUpdate();
    }, wormSpeed);
  }
}

function generatePellet() {
  pelletPos = Math.floor(Math.random() * maxPixels);
  if (
    document
      .querySelector(`.pixel:nth-child(${pelletPos})`)
      .classList.contains("black") ||
    document
      .querySelector(`.pixel:nth-child(${pelletPos})`)
      .classList.contains("enemy")
  ) {
    generatePellet();
  } else {
    document
      .querySelector(`.pixel:nth-child(${pelletPos})`)
      .classList.add("pellet");
  }
}

function changeDirection(dir, bodyArray, length, type) {
  let lastArraySeg = bodyArray[bodyArray.length - 1];
  //console.log(lastArraySeg % 40);
  if (dir == 1) {
    if (lastArraySeg % width == 0 && !(lastArraySeg + dir) % width == 0) {
      bodyArray.push(bodyArray[bodyArray.length - 1] + dir - width);
    } else {
      bodyArray.push(bodyArray[bodyArray.length - 1] + dir);
    }
  } else if (dir == -1) {
    if ((lastArraySeg % width) - 1 == 0 && !(lastArraySeg - dir) % width == 0) {
      bodyArray.push(bodyArray[bodyArray.length - 1] + dir + width);
    } else {
      bodyArray.push(bodyArray[bodyArray.length - 1] + dir);
    }
  } else if (dir == width) {
    if (lastArraySeg + dir > maxPixels) {
      bodyArray.push(bodyArray[bodyArray.length - 1] + dir - maxPixels);
    } else {
      bodyArray.push(bodyArray[bodyArray.length - 1] + dir);
    }
  } else if (dir == -width) {
    if (lastArraySeg + dir <= 0) {
      bodyArray.push(bodyArray[bodyArray.length - 1] + dir + maxPixels);
    } else {
      bodyArray.push(bodyArray[bodyArray.length - 1] + dir);
    }
  }

  if (bodyArray.length - 1 === length) {
    if (type == "player") {
      document
        .querySelector(`.pixel:nth-child(${bodyArray[0]})`)
        .classList.remove("black");
    } else {
      document
        .querySelector(`.pixel:nth-child(${bodyArray[0]})`)
        .classList.remove("enemy");
    }
    bodyArray.shift();
  }
}

function updateScore() {
  if (!failcheck) {
    setTimeout(() => {
      document.getElementById("scoreText").innerHTML =
        numberToText.convertToText(score) + " Points";

      updateScore();
    }, "10");
  }
}
let enemyWormStop = false;
let enemyDir = -1;

function enemyWorm() {
  if (pelletPos < enemySegments[enemySegments.length - 1]) {
    enemyDir = -width;
  }
  let lastEnemySeg = enemySegments[enemySegments.length - 1];
  if (pelletPos < lastEnemySeg && lastEnemySeg > pelletPos + width) {
    enemyDir = -width;
  } else if (pelletPos > lastEnemySeg && lastEnemySeg < pelletPos + width) {
    enemyDir = width;
  } else if (pelletPos < lastEnemySeg && lastEnemySeg < pelletPos + width) {
    enemyDir = -1;
  } else if (
    (pelletPos > lastEnemySeg && lastEnemySeg < pelletPos + width) ||
    (pelletPos + width > 1600 && pelletPos - width < lastEnemySeg)
  ) {
    enemyDir = 1;
  }

  //console.log(pelletPos + "p " + lastEnemySeg);

  if (
    enemySegments[enemySegments.length - 1] + enemyDir < width * width &&
    document
      .querySelector(
        `.pixel:nth-child(${
          enemySegments[enemySegments.length - 1] + enemyDir
        })`
      )
      .classList.contains("black")
  ) {
    enemyWormStop = true;
  } else if (
    document
      .querySelector(
        `.pixel:nth-child(${enemySegments[enemySegments.length - 1]})`
      )
      .classList.contains("pellet")
  ) {
    document
      .querySelector(
        `.pixel:nth-child(${enemySegments[enemySegments.length - 1]})`
      )
      .classList.remove("pellet");
    readWord("munch", 3, 1.3);
    enemyWormLength++;

    // if (!(wormSpeed <= maxWormSpeed)) {
    //   wormSpeed--;
    // }
    generatePellet();
  } else {
    enemyWormStop = false;
  }

  enemySegments.forEach((seg) => {
    document.querySelector(`.pixel:nth-child(${seg})`).classList.add("enemy");
  });

  if (!enemyWormStop) {
    //enemyDir = 1;
    changeDirection(enemyDir, enemySegments, enemyWormLength, "enemy");
  } else {
    //enemyDir = 0;
  }
  setTimeout(() => {
    enemyWorm();
  }, "200");
}
function hunger() {
  var hungerBar = document.getElementById("wormFoodBar");
  hungerBar.style.width = hungerLevel + "%";

  if (hungerLevel <= 0) {
    fail();
  }
  setTimeout(() => {
    if (!failcheck) {
      hunger();
    }
  }, 10);
}
function setSpeech() {
  return new Promise(function (resolve, reject) {
    let synth = window.speechSynthesis;
    let id;

    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
}

//fail();
function readWord(sampleWord, voiceIndex, voiceRate) {
  var speakWord = new SpeechSynthesisUtterance();

  let s = setSpeech();
  s.then(
    //(voices) => console.log(voices)
    function setVoice(voiceChosenWord) {
      speakWord.voice = voiceChosenWord[voiceIndex];
      //console.log(speakWord.voice);
      speakWord.volume = 1;
      speakWord.rate = voiceRate;
      speakWord.pitch = 3;
      speakWord.text = sampleWord;
      window.speechSynthesis.speak(speakWord);
    }
  );
}

function hungerDecay() {
  if (!failcheck) {
    hungerLevel--;
    if (hungerLevel == 25) {
      readWord("I am very hungry", 2, 0.8);
    }
    setTimeout(() => {
      hungerDecay();
    }, 500 - Math.floor(wormLength * 0.5));
  }
}
function fail() {
  hunger = 1;
  readWord("sorry! better luck nex time, cheeky fella", 7, 0.6);
  failcheck = true;
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

main();
userInput();
generatePellet();
updateScore();
hunger();
