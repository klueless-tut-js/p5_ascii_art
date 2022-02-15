// const density = '       .:-i|=+%O#@'
const density = '   .:-ia*+'
// const density = 'Ñ@#W$9876543210?!abc;:+=-,._           d ';

let video;
let asciiDiv; 

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(100, 100);
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  let asciiImage = "";

  for (let row = 0; row < video.height; row++) {
    for (let col = 0; col < video.width; col++) {
      const pixelIndex = (col + row * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}
