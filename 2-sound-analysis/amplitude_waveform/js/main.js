let audio, amp
console.clear();

function preload() {
  audio = loadSound('../../sounds/Tak_Bobby_Richards.mp3')
  console.log(audio)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  amp = new p5.Amplitude()
  fft = new p5.FFT()
  audio.play()
  audio.setVolume(0.1)
}

function draw() {
  background(0)
  stroke(255)
  //translate(width / 2, height / 2);
  //translate(0, height/2)
  const volume = amp.getLevel();
  // const mapW = map(volume, 0, 0.1, 0, 500);
  // rect(0, 0, mapW, mapW);


  // Show track waveform
  // const waveform = audio.getPeaks()
  // for(let i = 0; i<waveform.length; i++){
  //   line(i, waveform[i] * 100, i, waveform[i] * -100)
  // }

  // Show track fft
  const waveform = fft.waveform()
  for(let i = 0; i<waveform.length; i++){
    const x = map(i, 0, waveform.length, 0, width)
    const y = map(waveform[i], -1, 1, 0, height)
    point(x, y)
  }
  
}



