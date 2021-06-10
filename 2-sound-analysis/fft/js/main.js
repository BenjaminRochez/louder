let audio, amp;
console.clear();
const bins = 16
let binWidth 



function preload() {
  audio = loadSound("../../sounds/On_The_Hunt-Andrew_Langdon.mp3");
  
  console.log(audio);
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(togglePlay)
  
  fft = new p5.FFT(0, bins);

  binWidth = width / bins
  audio.setVolume(0.1);
}

function draw() {
  background(0);
  noStroke()

  const spectrum = fft.analyze()
  for (let i = 0; i < spectrum.length; i++) {
    const y = map(spectrum[i], 0, 255, height, 0);
    rect(i * binWidth, y, binWidth, height - y);
  }

}

function togglePlay(){
  if(audio.isPlaying()){
    audio.pause()
  }else{
    audio.loop()
  }
}