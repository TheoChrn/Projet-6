class FormData {
  constructor(first, last, eMail, textarea) {
    this.first = first
    this.last = last
    this.eMail = eMail
    this.textarea = textarea
  }

  openModal() {

  }

  closeModal() {
    
  }

  isValidatedConfirmed(e) {
    isValidateConfirmed()
    handleForm(e)
  }

  clear() {
    this.first.value = ''
    this.last.value = ''
    this.eMail.value = ''
    this.textarea.value = ''
  }

  handleForm() {

  }

  isEmail(regex) {

  }

  setSuccessFor(input, message) {
    const small = formControl.querySelector('small')
    const formControl = input.parentElement
    small.innerText = message
    formControl.className = 'form__data'
  }

  setErrorFor(input, message) {
    const small = formControl.querySelector('small')
    const formControl = input.parentElement
    small.innerText = message
    formControl.className = 'form__data error'
  }

  isFirstValid() {

  }

  isLastValid() {
    
  }

  isEmailValid() {
    
  }

  isTextAreaValid() {
    
  }
}

const modal = document.querySelector('#modal')
const myForm = document.querySelector('#form')
const formName = document.querySelector('#formName')
const confirmMessage = document.querySelector('#confirmedMessage')
const contactBtn = document.querySelector('.contact-btn')
const closeModalBtn = document.querySelector('.close-modal')
const closeBtn = document.querySelector('.close-btn')
const first = document.getElementById('first')
const last = document.getElementById('last')
const eMail = document.getElementById('email')
const textarea = document.getElementById('textarea')
const main = document.querySelector('main')

const validateForm = new FormData(myForm)