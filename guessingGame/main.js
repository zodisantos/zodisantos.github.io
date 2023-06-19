const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")
const btnTry = document.querySelector("#btnTry")
const btnReset = document.querySelector("#btnReset")
let randomNumber = Math.round(Math.random() * 10)
let qtErro = 1

// Eventos
btnTry.addEventListener('click', handleTryClick)
btnReset.addEventListener('click', handleResetClick)
btnReset.addEventListener('keydown', enter)

// Função callback
function handleTryClick(event) {
  event.preventDefault() // não faça o padrão desse evento - que é enviar pro formulário

  const inputNumber = document.querySelector("#inputNumber")

  if (Number(inputNumber.value) == randomNumber) {
    toggleScreen()
    screen2.querySelector("h2").innerText = `You got it right in ${qtErro} attempts`
  }

  inputNumber.value=""
  qtErro++
}

function handleResetClick() {
  toggleScreen()
  qtErro = 1
  randomNumber = Math.round(Math.random() * 10)
}

function toggleScreen() {
  screen1.classList.toggle("hide")
  screen2.classList.toggle("hide")
}

function enter() {
  if (enter.key == 'Enter') {
    handleResetClick()
  }
}