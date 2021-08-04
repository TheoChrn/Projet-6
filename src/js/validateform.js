const lockFocus = (container) => {
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  const firstFocusableElement = container.querySelectorAll(focusableElements)[0]
  const focusableContent = container.querySelectorAll(focusableElements)
  const lastFocusableElement = focusableContent[focusableContent.length - 1]

  document.addEventListener('keydown', function (e) {
    const isTabPressed = e.key === 'Tab' || e.key === 9

    if (!isTabPressed) {
      return
    }

    if (e.shiftKey) { // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus() // add focus for the last focusable element
        e.preventDefault()
      }
    } else { // if tab key is pressed
      if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus() // add focus for the first focusable element
        e.preventDefault()
      }
    }
  })
}

const modal = document.getElementById('modal')
const myForm = document.getElementById('form')
const formName = document.getElementById('formName')
const confirmMessage = document.getElementById('confirmedMessage')
const contactBtn = document.querySelector('.contact-btn')
const closeModalBtn = document.querySelectorAll('.close-modal')
const first = document.getElementById('first')
const last = document.getElementById('last')
const eMail = document.getElementById('email')
const textArea = document.getElementById('textarea')

// Open modal
const openModal = () => {
  document.activeElement.blur()
  modal.style.display = 'block'
  modal.setAttribute('aria-hidden', 'true')
  document.querySelector('main').setAttribute('aria-hidden', 'true')
  document.querySelector('#closeModal').focus()
  lockFocus(modal)
}

contactBtn.addEventListener('click', () => {
  openModal()
})

// Close Modal
const closeModal = () => {
  modal.style.display = 'none'
  myForm.style.display = 'block'
  confirmMessage.style.display = 'none'
  formName.style.display = 'block'
  modal.setAttribute('aria-hidden', 'false')
  document.querySelector('main').setAttribute('aria-hidden', 'false')
}

closeModalBtn.forEach(button => {
  button.addEventListener('click', () => {
    closeModal()
  })
})

// Onsubmit form validation
myForm.addEventListener('submit', e => {
  const formData = new FormData(myForm)
  e.preventDefault()
  for (let value of formData.values()) {
    console.log(value)
  }
  const formValidation = () => {
    const setSuccessFor = (input, message) => {
      const formControl = input.parentElement
      const small = formControl.querySelector('small')

      // remove error message inside small
      small.innerText = message
      // remove error class
      formControl.className = 'form__data'
    }

    const setErrorFor = (input, message) => {
      const formControl = input.parentElement
      const small = formControl.querySelector('small')

      // add error message inside small
      small.innerText = message
      // add error class
      formControl.className = 'form__data error'
    }

    const isEmail = (eMail) => {
      const regex = (/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,5}/)
      return regex.test(eMail)
    }

    const isFirstValid = (first) => {
      const firstValue = formData.get('first')
      const result = (firstValue !== '')
      if (!result) {
        setErrorFor(first, 'Veuillez renseigner votre prénom')
        return false
      } else {
        setSuccessFor(first, '')
      }
      return true
    }

    const isLastValid = (last) => {
      const lastValue = formData.get('last')
      const result = (lastValue !== '')
      if (!result) {
        setErrorFor(last, 'Veuillez renseigner votre nom')
        return false
      } else {
        setSuccessFor(last, '')
      }
      return true
    }

    const isEmailValid = (email) => {
      const eMailValue = formData.get('email')
      const result = (eMailValue !== '')
      if (!result || !isEmail(eMailValue)) {
        setErrorFor(email, 'Veuillez renseigner un email valide')
        return false
      } else {
        setSuccessFor(email, '')
      }
      return true
    }

    const isTextAreaValid = (textarea) => {
      const textAreaValue = formData.get('textarea')
      const result = (textAreaValue !== '')
      if (!result) {
        setErrorFor(textarea, 'Veuillez renseigner le champs')
        return false
      } else {
        setSuccessFor(textarea, '')
      }
      return true
    }

    const clear = () => {
      first.value = ''
      last.value = ''
      eMail.value = ''
      textArea.value = ''
    }

    const isValid = () => {
      return isFirstValid(first) && isLastValid(last) && isEmailValid(eMail) && isTextAreaValid(textArea)
    }

    if (isValid() === true) {
      lockFocus(confirmMessage)
      document.activeElement.blur()
      document.querySelector('#closeModal').focus()
      myForm.style.display = 'none'
      confirmMessage.style.display = 'flex'
      formName.style.display = 'none'
      clear()
    }
  }
  formValidation()
})
