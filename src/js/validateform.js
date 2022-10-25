// DOM
const modal = document.querySelector('#modal')
const form = document.querySelector('#form')
const formName = document.querySelector('#formName')
const confirmMessage = document.querySelector('#confirmedMessage')
const contactBtn = document.querySelector('.contact-btn')
const closeModalBtn = document.querySelector('.close-modal')
const closeBtn = document.querySelector('.close-btn')
const first = document.getElementById('first')
const last = document.getElementById('last')
const eMail = document.getElementById('email')
const textarea = document.getElementById('textarea')

// Open modal
contactBtn.addEventListener('click', openModal)

function openModal () {
  modal.style.display = 'block'
}

// Close modal event
closeBtn.addEventListener('click', closeModal)
closeModalBtn.addEventListener('click', closeModal)

// Close modal form
function closeModal () {
  modal.style.display = 'none'
  form.style.display = 'block'
  confirmMessage.style.display = 'none'
  formName.style.display = 'block'
}

form.addEventListener('submit', (event) => {
  isValidateConfirmed()
  handleForm(event)
})

// Show SubmitMessage
function isValidateConfirmed () {
  if (validate() === true) {
    form.style.display = 'none'
    confirmMessage.style.display = 'flex'
    formName.style.display = 'none'
    clear()
  }
}

// Clear Inputs
function clear () {
  first.value = ''
  last.value = ''
  eMail.value = ''
  textarea.value = ''
}

// Block page refresh
function handleForm (event) {
  event.preventDefault()
}

// regex
function isEmail (eMail) {
  const regex = (/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,5}/)
  return regex.test(eMail)
}

// Function setErrorFor
function setErrorFor (input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')

  // add error message inside small
  small.innerText = message
  // add error class
  formControl.className = 'form__data error'
}

// Function setSuccessFor
function setSuccessFor (input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')

  // remove error message inside small
  small.innerText = message
  // remove error class
  formControl.className = 'form__data'
}

// Function isValid
/**
 * Vérifier que le prénom donné est valide
 *
 * @param  {HTMLElement} first
 * @return {boolean} prénom valide ou non
 */
function isFirstValid (first) {
  const firstNameValueTrim = first.value.trim()
  const result = (firstNameValueTrim !== '')
  if (!result) {
    setErrorFor(first, 'Veuillez renseigner votre prénom')
    return false
  } else {
    setSuccessFor(first, '')
  }
  return true
}

/**
 * Vérifier que le nom donné est valide
 *
 * @param  {HTMLElement} last
 * @return {boolean} nom valide ou non
 */
function isLastValid (last) {
  const lastNameValueTrim = last.value.trim()
  const result = (lastNameValueTrim !== '')
  if (!result) {
    setErrorFor(last, 'Veuillez renseigner votre nom')
    return false
  } else {
    setSuccessFor(last, '')
  }
  return true
}

/**
 * Vérifier que l'email donné est valide et conforme au regex
 *
 * @param  {HTMLElement} eMail
 * @return {boolean} email valide ou non
 */
function isEmailValid (eMail) {
  const eMailValueTrim = eMail.value.trim()
  const result = (eMailValueTrim !== '')
  if (!result || !isEmail(eMailValueTrim)) {
    setErrorFor(eMail, 'Veuillez renseigner un email valide')
    return false
  } else {
    setSuccessFor(eMail, '')
  }
  return true
}

/**
* Vérifier que l'email donné est valide
*
* @param  {HTMLElement} textarea
* @return {boolean} nom valide ou non
*/
function isTextAreaValid (textarea) {
  const textareaValueTrim = textarea.value.trim()
  const result = (textareaValueTrim !== '')
  if (!result) {
    setErrorFor(textarea, 'Veuillez renseigner le champs')
    return false
  } else {
    setSuccessFor(textarea, '')
  }
  return true
}

// Retourner toutes les fonctions de validation
function validate () {
  // return every CheckFunction
  return isFirstValid(first) && isLastValid(last) && isEmailValid(eMail) &&
    isTextAreaValid(textarea)
}
