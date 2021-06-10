console.clear();

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER);
  strokeWeight(5);
}

function draw() {
  background(51);
  fill("red");
  stroke("yellow");
  translate(width / 2, height / 2);
  rect(0, 0, 500, 500);
  console.log("Hello");

  push();
  fill("green");
  ellipse(0, 0, 100);
  pop();
}
