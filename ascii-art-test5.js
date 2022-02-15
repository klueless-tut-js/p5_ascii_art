const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';

let david;

function preload() {
  david = loadImage('david-square-cut-96.jpg');
  // david = loadImage("david-square-cut-nobk-96.png");
}

function setup() {
  noCanvas();

  david.loadPixels();  

  for (let row = 0; row < david.height; row++) {
    let line = '';
    for (let col = 0; col < david.width; col++) {
      const pixelIndex = (col + row * david.width) * 4;
      const r = david.pixels[pixelIndex + 0];
      const g = david.pixels[pixelIndex + 1];
      const b = david.pixels[pixelIndex + 2];

      avg = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));

      const c = density.charAt(charIndex);
      if (c == " ") line += "&nbsp;";
      else line += c;
    }
    createDiv(line);
  }
}
