let myShaders, audio, amp, fft, beatDetect

let words = ['louder', 'noisy', 'blaring', 'booming', 'roaring', 'thunderous', 'thundering', 'piercing', 'clamorous', 'tumultuous']
const texts = [...document.querySelectorAll('.text span')]

// this.bass = [20,140]
// this.lowMid = [140,400]
// this.mid = [400, 2600]
// this.highMid = [2600, 5200]
// this.treble = [5200, 14000]


function preload() {
  myShaders = loadShader('shaders/vertex.vert', 'shaders/fragment.frag')

  audio = loadSound('../../sounds/On_The_Hunt-Andrew_Langdon.mp3')

}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.mouseClicked(togglePlay)
  shader(myShaders)

  amp = new p5.Amplitude()
  fft = new p5.FFT()
  beatDetect = new p5.PeakDetect(20, 140, 0.8)
	beatDetect.onPeak(triggerBeat)
}

function draw() {
  background(0)

  fft.analyze()
  beatDetect.update(fft)
  const volume = amp.getLevel() // 0 - 1
  //const freq = fft.getEnergy('highMid') // 0 - 255
  let freq = fft.getCentroid() // 0 - 255
  freq *= 0.005

  mapF = map(freq, 0, 1, 0, 20);
  //mapA = map(volume, 0, 0.5, 0, 0.5);
  mapA = map(volume, 0, 0.5, 0, 0.5);

  myShaders.setUniform('uTime', frameCount)
  myShaders.setUniform('uFrequency', mapF)
  myShaders.setUniform('uAmplitude', mapA)
  sphere(height / 3, 200, 200)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function triggerBeat() {
  console.log('PEAK')
	texts.forEach((el, i) => {
		setTimeout(() => {
			el.innerHTML = random(words)
		}, random(200) * i)
	})
}


function togglePlay(){
  if(audio.isPlaying()){
    audio.pause()
  }else{
    audio.loop()
  }
}