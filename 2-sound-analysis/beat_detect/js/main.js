let audio
let fft
console.clear();
const bins = 64
let peakDetect
let bgColor = 0
// this.bass = [20,140]
// this.lowMid = [140,400]
// this.mid = [400, 2600]
// this.highMid = [2600, 5200]
// this.treble = [5200, 14000]


function preload() {
  audio = loadSound("../../sounds/Tak_Bobby_Richards.mp3");
  
  console.log(audio);
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(togglePlay)
  
  fft = new p5.FFT();
  //peakDetect = new p5.PeakDetect(140, 400, 0.8)
  peakDetect = new p5.PeakDetect(400, 2600, 0.1)
  peakDetect.onPeak(peackDecteded)
  //audio.setVolume(0.1);
}

function draw() { 
  background(bgColor); 
  noStroke()

  fft.analyze(bins)
  peakDetect.update(fft)
}


function peackDecteded(){
  console.log('Peak Detected')
  bgColor = color(random(255), random(255), random(255))
}

function togglePlay(){
  if(audio.isPlaying()){
    audio.pause()
  }else{
    audio.loop()
  }
}