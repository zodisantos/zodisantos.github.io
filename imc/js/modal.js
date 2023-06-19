export const Modal = {

  wrapper: document.querySelector('.modal-wrapper'),
  message: document.querySelector('.modal .title span'),
  buttonClose: document.querySelector('.modal button'),
  
  open() {
    Modal.wrapper.classList.add('open')
  },
  close() {
    Modal.wrapper.classList.remove('open')
  }
}

export const Form = {
  form: document.querySelector('form'),
  inputWeight: document.querySelector('#weight'),
  inputHeight: document.querySelector('#height')
}

Modal.buttonClose.onclick = () => {
  //modalWrapper.classList.remove('open')
  Form.inputWeight.value = null
  Form.inputHeight.value = null
  Modal.close()
}

window.addEventListener('keydown', handleKeydown)
function handleKeydown(event) {
  if (event.key === 'Escape') {
    Form.inputWeight.value = null
    Form.inputHeight.value = null
    Modal.close()
  }
}