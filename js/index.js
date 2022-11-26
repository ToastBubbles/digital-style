// const numberToText = require("number-to-text");
const game = require("./game");

// console.log(controls);

function main() {
  game.initialSetup();

  setTimeout(() => {
    game.wormUpdate();
  }, "10");
}

// let buttonString = "ArrowRight";

// /*function userInput() {
//   let textBox = document.getElementById("message");
//   textBox.addEventListener("keydown", (event) => {
//     console.log(`key=${event.key},code=${event.code}`);
//     buttonString = event.key;
//   });
// }*/

// function generatePixels(pixelCount) {
//   let htmlString = "";
//   let trackerNum = 1;
//   let whiteArray = [
//     /*371, 372, 373, 374, 375, 386, 387, 388, 389, 390, 410, 411, 412, 413, 414,
//     415, 416, 425, 426, 427, 428, 429, 430, 431, 450, 451, 452, 453, 454, 455,
//     456, 465, 466, 467, 468, 469, 470, 471, 490, 491, 492, 493, 494, 495, 496,
//     505, 506, 507, 508, 509, 510, 511, 530, 531, 532, 533, 534, 535, 546, 547,
//     547, 548, 549, 550, 551, 571, 572, 573, 574, 587, 588, 589, 590,*/
//   ];
//   for (var i = 0; i < pixelCount; i++) {
//     if (whiteArray.includes(trackerNum)) {
//       //htmlString += `<div class="pixel white">${trackerNum}</div>`;
//       htmlString += `<div class="pixel white"></div>`;
//     } else {
//       //htmlString += `<div class="pixel">${trackerNum}</div>`;
//       htmlString += `<div class="pixel"></div>`;
//     }

//     trackerNum++;
//   }

//   return htmlString;
// }
// let lastButton = "";
// let direction = 1;
// function wormUpdate() {
//   if (
//     document
//       .querySelector(
//         `.pixel:nth-child(${bodySegments[bodySegments.length - 1]})`
//       )
//       .classList.contains("black")
//   ) {
//     fail();
//   } else if (
//     document
//       .querySelector(
//         `.pixel:nth-child(${bodySegments[bodySegments.length - 1]})`
//       )
//       .classList.contains("pellet")
//   ) {
//     console.log("i eated a peller");
//     score += 50;
//     document
//       .querySelector(
//         `.pixel:nth-child(${bodySegments[bodySegments.length - 1]})`
//       )
//       .classList.remove("pellet");
//     wormLength++;
//     if (!(wormSpeed <= maxWormSpeed)) {
//       wormSpeed--;
//     }
//     generatePellet();
//   }

//   bodySegments.forEach((seg) => {
//     document.querySelector(`.pixel:nth-child(${seg})`).classList.add("black");
//   });

//   switch (buttonString) {
//     case "ArrowLeft":
//       if (!(lastButton == "ArrowRight")) {
//         direction = -1;
//         lastButton = buttonString;
//       }
//       break;
//     case "ArrowRight":
//       if (!(lastButton == "ArrowLeft")) {
//         direction = 1;
//         lastButton = buttonString;
//       }
//       break;
//     case "ArrowUp":
//       if (!(lastButton == "ArrowDown")) {
//         direction = -width;
//         lastButton = buttonString;
//       }
//       break;
//     case "ArrowDown":
//       if (!(lastButton == "ArrowUp")) {
//         direction = width;
//         lastButton = buttonString;
//       }
//       break;
//     default:
//       direction = 1;
//   }

//   changeDirection(direction);

//   if (!failcheck) {
//     setTimeout(() => {
//       wormUpdate();
//     }, wormSpeed);
//   }
// }

// function generatePellet() {
//   let newPos = Math.floor(Math.random() * maxPixels);
//   if (
//     document
//       .querySelector(`.pixel:nth-child(${newPos})`)
//       .classList.contains("black")
//   ) {
//     generatePellet();
//   } else {
//     document
//       .querySelector(`.pixel:nth-child(${newPos})`)
//       .classList.add("pellet");
//   }
// }

// function changeDirection(dir) {
//   let lastArraySeg = bodySegments[bodySegments.length - 1];
//   //console.log(lastArraySeg % 40);
//   if (dir == 1) {
//     if (lastArraySeg % width == 0 && !(lastArraySeg + dir) % width == 0) {
//       bodySegments.push(bodySegments[bodySegments.length - 1] + dir - width);
//     } else {
//       bodySegments.push(bodySegments[bodySegments.length - 1] + dir);
//     }
//   } else if (dir == -1) {
//     if ((lastArraySeg % width) - 1 == 0 && !(lastArraySeg - dir) % width == 0) {
//       bodySegments.push(bodySegments[bodySegments.length - 1] + dir + width);
//     } else {
//       bodySegments.push(bodySegments[bodySegments.length - 1] + dir);
//     }
//   } else if (dir == width) {
//     if (lastArraySeg + dir > maxPixels) {
//       bodySegments.push(
//         bodySegments[bodySegments.length - 1] + dir - maxPixels
//       );
//     } else {
//       bodySegments.push(bodySegments[bodySegments.length - 1] + dir);
//     }
//   } else if (dir == -width) {
//     if (lastArraySeg + dir <= 0) {
//       bodySegments.push(
//         bodySegments[bodySegments.length - 1] + dir + maxPixels
//       );
//     } else {
//       bodySegments.push(bodySegments[bodySegments.length - 1] + dir);
//     }
//   }

//   if (bodySegments.length - 1 === wormLength) {
//     document
//       .querySelector(`.pixel:nth-child(${bodySegments[0]})`)
//       .classList.remove("black");
//     bodySegments.shift();
//   }
// }

// function updateScore() {
//   if (!failcheck) {
//     setTimeout(() => {
//       /*
//       document
//         .querySelector(`.pixel:nth-child(${width / 2 + width})`)
//         .classList.add("scoreText");
//       document.querySelector(
//         `.pixel:nth-child(${width / 2 + width})`
//       ).innerHTML = score;*/

//       document.getElementById("scoreText").innerHTML =
//         numberToText.convertToText(score);

//       updateScore();
//     }, "10");
//   }
// }

// function fail() {
//   failcheck = true;
//   document.querySelector(
//     `.pixel:nth-child(${maxPixels / 2 - width / 2 - 3})`
//   ).innerHTML = "F";
//   document.querySelector(
//     `.pixel:nth-child(${maxPixels / 2 - width / 2 - 2})`
//   ).innerHTML = "A";
//   document.querySelector(
//     `.pixel:nth-child(${maxPixels / 2 - width / 2 - 1})`
//   ).innerHTML = "I";
//   document.querySelector(
//     `.pixel:nth-child(${maxPixels / 2 - width / 2})`
//   ).innerHTML = "L";
//   document.querySelector(
//     `.pixel:nth-child(${maxPixels / 2 - width / 2 + 1})`
//   ).innerHTML = "E";
//   document.querySelector(
//     `.pixel:nth-child(${maxPixels / 2 - width / 2 + 2})`
//   ).innerHTML = "D";
// }

// main();
// controls.userInput();
// generatePellet();
// updateScore();

setTimeout(function () {
  main();
}, 20);
