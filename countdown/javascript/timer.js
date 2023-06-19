import Sound from "./sounds.js"

export function Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls}) {

  let timerTimeOut
  let minutes = Number(minutesDisplay.textContent)

  function updateDisplay(minutes, seconds) {
    minutesDisplay.textContent = String(minutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")
  }

  function reset() {
    updateDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
  }

  function countdown() {
    timerTimeOut = setTimeout(function() {
      let seconds = Number(secondsDisplay.textContent)
      let minutesc = Number(minutesDisplay.textContent)

      updateDisplay(minutesc, 0)

      if (minutesc == 0 && seconds == 0) {
        resetControls()
        updateDisplay(minutes, 0)
        Sound().timeEnd()
        return 
      }
    
      if (seconds == 0) {
        seconds = 60
        --minutesc
      }
      
      updateDisplay(minutesc, (seconds - 1))
      
      countdown()
    }, 1000)
  }

  function updateMinutes(newMinutes) {
    minutes = newMinutes
  }

  function hold() {
    clearTimeout(timerTimeOut)
  }

  return {
    countdown,
    reset,
    updateDisplay,
    updateMinutes,
    hold
  }
}

// named export
//export default {countdown, resetTimer}