let myShaders, audio, amp, fft

function preload() {
  myShaders = loadShader('shaders/vertex.vert', 'shaders/fragment.frag')

  audio = loadSound('../../../sounds/On_The_Hunt-Andrew_Langdon.mp3')

}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.mouseClicked(togglePlay)
  shader(myShaders)

  amp = new p5.Amplitude()
  fft = new p5.FFT()
}

function draw() {
  background(0)

  fft.analyze()
  const volume = amp.getLevel() // 0 - 1
  //const freq = fft.getEnergy('highMid') // 0 - 255
  let freq = fft.getCentroid() // 0 - 255
  freq *= 0.001

  mapF = map(freq, 0, 1, 0, 20);
  mapA = map(volume, 0, 0.5, 0, 0.5);

  myShaders.setUniform('uTime', frameCount)
  myShaders.setUniform('uFrequency', mapF)
  myShaders.setUniform('uAmplitude', mapA)
  sphere(height / 3, 200, 200)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}



function togglePlay(){
  if(audio.isPlaying()){
    audio.pause()
  }else{
    audio.loop()
  }
}