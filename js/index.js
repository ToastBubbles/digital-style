let mainGrid = document.getElementById("main_grid");

function main() {
  //document.querySelector
  let maxPixels = 1600;

  mainGrid.innerHTML = generatePixels(maxPixels);

  setTimeout(() => {
    pupilUpdater();
  }, "10");
}

let buttonString = "";

function userInput() {
  let textBox = document.getElementById("message");
  textBox.addEventListener("keydown", (event) => {
    console.log(`key=${event.key},code=${event.code}`);
    buttonString = event.key;
  });
}

function generatePixels(pixelCount) {
  let htmlString = "";
  let trackerNum = 1;
  let whiteArray = [
    371, 372, 373, 374, 375, 386, 387, 388, 389, 390, 410, 411, 412, 413, 414,
    415, 416, 425, 426, 427, 428, 429, 430, 431, 450, 451, 452, 453, 454, 455,
    456, 465, 466, 467, 468, 469, 470, 471, 490, 491, 492, 493, 494, 495, 496,
    505, 506, 507, 508, 509, 510, 511, 530, 531, 532, 533, 534, 535, 546, 547,
    547, 548, 549, 550, 551, 571, 572, 573, 574, 587, 588, 589, 590,
    /*368, 369, 370, 391, 392, 393, 407, 408, 409, 410, 411, 430, 431, 432, 433,
    434, 446, 447, 448, 449, 450, 451, 452, 469, 470, 471, 472, 473, 474, 475,
    486, 487, 488, 489, 490, 491, 492, 509, 510, 511, 512, 513, 514, 515, 526,
    527, 528, 529, 530, 531, 532, 549, 550, 551, 552, 553, 554, 555, 566, 567,
    568, 569, 570, 571, 572, 589, 590, 591, 592, 593, 594, 595, 607, 608, 609,
    610, 611, 630, 631, 632, 633, 634, 648, 649, 650, 671, 672, 673,*/
  ];
  for (var i = 0; i < pixelCount; i++) {
    if (whiteArray.includes(trackerNum)) {
      htmlString += `<div class="pixel white">${trackerNum}</div>`;
    } else {
      htmlString += `<div class="pixel">${trackerNum}</div>`;
    }

    trackerNum++;
  }

  return htmlString;
}
let lookPos = 1;
let wormLength = 20;
let bodySegments = [722, 723, 724];

function pupilUpdater() {
  if (
    document
      .querySelector(
        `.pixel:nth-child(${bodySegments[bodySegments.length - 1]})`
      )
      .classList.contains("black")
  ) {
    console.log("failed");
  }
  bodySegments.forEach((seg) => {
    document.querySelector(`.pixel:nth-child(${seg})`).classList.add("black");
  });

  switch (buttonString) {
    case "ArrowLeft":
      bodySegments.push(bodySegments[bodySegments.length - 1] - 1);
      if (bodySegments.length - 1 === wormLength) {
        document
          .querySelector(`.pixel:nth-child(${bodySegments[0]})`)
          .classList.remove("black");
        bodySegments.shift();
      }
      break;
    case "ArrowRight":
      bodySegments.push(bodySegments[bodySegments.length - 1] + 1);
      if (bodySegments.length - 1 === wormLength) {
        document
          .querySelector(`.pixel:nth-child(${bodySegments[0]})`)
          .classList.remove("black");
        bodySegments.shift();
      }
      break;
    case "ArrowUp":
      bodySegments.push(bodySegments[bodySegments.length - 1] - 40);
      if (bodySegments.length - 1 === wormLength) {
        document
          .querySelector(`.pixel:nth-child(${bodySegments[0]})`)
          .classList.remove("black");
        bodySegments.shift();
      }
      break;
    case "ArrowDown":
      bodySegments.push(bodySegments[bodySegments.length - 1] + 40);
      if (bodySegments.length - 1 === wormLength) {
        document
          .querySelector(`.pixel:nth-child(${bodySegments[0]})`)
          .classList.remove("black");
        bodySegments.shift();
      }
      break;
    default:
      bodySegments.push(bodySegments[bodySegments.length - 1] + 1);
      if (bodySegments.length - 1 === wormLength) {
        document
          .querySelector(`.pixel:nth-child(${bodySegments[0]})`)
          .classList.remove("black");
        bodySegments.shift();
      }
  }

  /*
  let myPixel = document.querySelector(`.pixel:nth-child(${lookPos})`);
  let prevPixel = document.querySelector(
    `.pixel:nth-child(${lookPos - wormLength})`
  );
  //console.log(document.querySelector(`.pixel:nth-child(${lookPos})`));
  if (lookPos <= 1600) {
    myPixel.classList.add("black");
  }
  if (lookPos - wormLength > 0) {
    prevPixel.classList.remove("black");
  }

  if (lookPos < 1600 + wormLength) {
    switch (buttonString) {
      case "ArrowLeft":
        lookPos--;
        break;
      case "ArrowRight":
        lookPos++;
        break;
      case "ArrowUp":
        lookPos -= 40;
        break;
      case "ArrowDown":
        lookPos += 40;
        break;
      default:
        lookPos++;
        break;
    }
  } else {
    lookPos = 1;
  }*/
  setTimeout(() => {
    pupilUpdater();
  }, "100");
}

main();
userInput();
