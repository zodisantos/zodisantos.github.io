import { Modal, Form } from './modal.js'
import { AlertError } from './alert-error.js'
import { IMC, notNumber} from './utils.js'
// variables
//const form = document.querySelector('form')
//const inputWeight = document.querySelector('#weight')
//const inputHeight = document.querySelector('#height')

//const modalWrapper = document.querySelector('.modal-wrapper')
//const modalMessage = document.querySelector('.modal .title span')
//const modalBtnClose = document.querySelector('.modal button')
//const alertError = document.querySelector('.alert-error')

Form.form.onsubmit = function(event) {
  event.preventDefault()
  
  const weight = Form.inputWeight.value 
  const height = Form.inputHeight.value

  const weightOrHeightIsNotNumber = notNumber(weight) || notNumber(height)

  if (weightOrHeightIsNotNumber) {
    AlertError.open()
    Form.inputWeight.value = null
    Form.inputHeight.value = null
    return;
  }
 
  AlertError.close()

  const result = IMC(weight, height)
  displayResultMessage(result)
  
}

function displayResultMessage(result) {
  const message = `Seu IMC é de ${result}`
  Modal.message.innerText = message
  //modalWrapper.classList.add('open')
  Modal.open()
}

Form.inputWeight.oninput = () => AlertError.close()
Form.inputHeight.oninput = () => AlertError.close()