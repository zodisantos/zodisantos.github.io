import {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonSet,
  buttonSoundOn,
  buttonSoundOff
} from "./elements.js"

export default function({
  controls, 
  timer, 
  sound}) {

buttonPlay.addEventListener('click', () => {
  controls.play()
  timer.countdown()
  sound.pressButton()
})

buttonPause.addEventListener('click', () => {
  controls.pause()
  timer.hold()
  sound.pressButton()
})

buttonStop.addEventListener('click', () => {
 controls.reset()
 timer.reset()
 sound.pressButton()
})

buttonSoundOn.addEventListener('click', () => {
  buttonSoundOn.classList.add('hide')
  buttonSoundOff.classList.remove('hide')
  sound.bgAudio.pause()
})

buttonSoundOff.addEventListener('click', () => {
  buttonSoundOff.classList.add('hide')
  buttonSoundOn.classList.remove('hide')
  sound.bgAudio.play()
})

buttonSet.addEventListener('click', () => {
  let minutes = controls.getMinutes()
  if (!minutes) {
    timer.reset()
  }
  else {
    timer.updateDisplay(minutes, 0)
    timer.updateMinutes(minutes)
  }
})
}