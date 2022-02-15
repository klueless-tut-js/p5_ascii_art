const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';

let david;

function preload() {
  david = loadImage('david-square-cut-96.jpg');
  // david = loadImage("david-square-cut-nobk-96.png");
}

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(0);
  // image(david, 0, 0, width, height);
 
  let w = width / david.width;
  let h = height / david.height;

  david.loadPixels();  

  for (let col = 0; col < david.width; col++) {
    for (let row = 0; row < david.height; row++) {
      const pixelIndex = (col + row * david.width) * 4;
      const r = david.pixels[pixelIndex + 0];
      const g = david.pixels[pixelIndex + 1];
      const b = david.pixels[pixelIndex + 2];

      avg = (r + g + b) / 3;

      noStroke();
      fill(255);

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      // square(col * w, row * h, w);
      textSize(w);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), col * w + w * 0.5, row * h + h * 0.5);
    }
  }
}
