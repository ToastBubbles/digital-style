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
      //htmlString += `<div class="pixel white">${trackerNum}</div>`;
      htmlString += `<div class="pixel white"></div>`;
    } else {
      //htmlString += `<div class="pixel">${trackerNum}</div>`;
      htmlString += `<div class="pixel"></div>`;
    }

    trackerNum++;
  }

  return htmlString;
}

module.exports.generatePixels = generatePixels;
