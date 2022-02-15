let sourceText;
let poem;
let image;
let startIndex = 0;

function preload() {
  image = loadImage('david-square-cut-96.jpg');
  // image = loadImage("david-square-cut-nobk-96.png");
  sourceText = loadStrings('words.txt');
}

function setup() {
  createCanvas(1000, 1000);
  poem = sourceText.join(' ');
  textFont('Courier-Bold');
}

function draw() {
  background(0);
  frameRate(10);

  let charIndex = startIndex;
  let w = width / image.width;
  let h = height / image.height;
  image.loadPixels();
  for (let j = 0; j < image.height; j++) {
    for (let i = 0; i < image.width; i++) {
      const pixelIndex = (i + j * image.width) * 4;
      const r = image.pixels[pixelIndex + 0];
      const g = image.pixels[pixelIndex + 1];
      const b = image.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      noStroke();
      fill(avg);
      textSize(w * 1.2);
      textAlign(CENTER, CENTER);

      text(poem.charAt(charIndex % poem.length), i * w + w * 0.5, j * h + h * 0.5);
      charIndex++;
    }
  }

  startIndex++;
}
