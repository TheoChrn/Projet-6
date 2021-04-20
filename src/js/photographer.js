// DOM
const header = document.createElement('header')
const container = document.querySelector('#container')
const main = document.createElement('main')
const modal = document.createElement('section')
const photos = document.createElement('section')

const params = (new URL(document.location)).searchParams
const id = params.get('id')
const getData = () => import('../../data.json')
getData().then(async res => {
  const data = res.default
  const photographer = data.photographers.find(p => `${p.id}` === id)
  const media = data.media.filter(m => `${m.photographerId}` === id)
  console.log(media)
  if (photographer === undefined) {
    window.location = 'index.html'
  }
  const url = await import(`../public/assets/images/Photographers_ID_Photos/${photographer.portrait}`)
  const logo = await import('../public/assets/images/logo.png')
  document.title = `${photographer.name}`
  header.innerHTML +=
    `
    <figure id="logo">
      <a href="./">
        <img src="${logo.default}" alt="Fisheye Home page" class="logo">
      </a>
    </figure>
  `
  modal.innerHTML +=
    `
    <div id="content" class="content">
    <h2 id="formName" class="name content__name">Contactez-moi<br>${photographer.name}</h2>
    <div class="cross close-modal">
      <span class="cross__bar cross__bar--1"></span>
      <span class="cross__bar cross__bar--2"></span>
    </div>
    <div id="modal__body" class="modal__body">
      <div id="confirmedMessage" class="modal__body__submitMessage">
        <p>Votre message a bien été envoyé !</p>
        <button class="btn close-btn">Fermer</button>
      </div>
      <form action="" id="form" class="form">
        <div class="form__data">
          <label for="first">Prénom</label>
          <input type="text" name="first" id="first" class="input form__data__input">
          <small class="form__data__error"></small>
        </div>
        <div class="form__data">
          <label for="last">Nom</label>
          <input type="text" name="last" id="last" class="input form__data__input">
          <small class="form__data__error"></small>
        </div>
        <div class="form__data">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" class="input form__data__input">
          <small class="form__data__error"></small>
        </div>
        <div class="form__data">
          <label for="textarea">Votre message</label>
          <textarea maxlength="50" name="textarea" id="textarea" class="input form__data__input"></textarea>
          <small class="form__data__error"></small>
        </div>
        <input type="submit" class="btn submit-btn" value="Envoyer">
      </form>
    </div>
  </div>
  `
  main.innerHTML +=
    `
  <article class="photographer photographer--page">
      <div class="photographer__idContainer photographer__idContainer--page">
        <figure class="photographer__idContainer__picture photographer__idContainer__picture--page">
          <img src="${url.default}"
            class="user photographer__idContainer__user photographer__idContainer__user--page" alt="">
        </figure>
      </div>
      <div class="photographer__container photographer__container--page">
        <h1 class="name photographer__idContainer__name photographer__idContainer__name--page">${photographer.name}</h1>
        <h2 class="location photographer__container__location photographer__container__location--page">${photographer.city}, ${photographer.country}</h2>
        <p class="description photographer__container__description photographer__container__description--page">${photographer.tagline}</p>
        <ul class="photographer__container__hashtags photographer__container__hashtags--page">
          ${photographer.tags.map(i => `<a href="#"><li class="tag-name photographer__container__tag-name photographer__container__tag-name--page">#${i}</li></a>`).join('')}
        </ul>
        <button id="contact-btn" class="btn contact-btn" aria-label="Contactez-moi">Contactez-moi</button>
        <aside class="photographer__informations">
          <div class="photographer__informations__likes">
            <small class="number photographer__informations__likes__number">297 081</small>
            <i class="heart photographer__informations__likes__heart fas fa-heart"></i>
          </div>
          <small class="price photographer__informations__dailyprice">${photographer.price}€/jour</small>
        </aside>
      </div>
    </article>
  `

  media.forEach(m => {
    photos.innerHTML +=
      `
    <article class="photo">
        <a href="#">
          <div class="photo__container">
            <figure class="photo__container__picture">
              <img src="" class="thumb photo__container__thumb" alt="">
            </figure>
          </div>
        </a>
        <div class="photo__description">
          <h2 class="name photo__description__name">Arc-en-ciel</h2>
          <div class="photo__description__infos">
            <small class="price photo__description__price">70€</small>
            <div class="photo__description__like">
              <small class="number photo__description__like__number">12</small>
              <i class="heart fas fa-heart"></i>
            </div>
          </div>
        </div>
    `
  })
  // Créer la page
  // Filtrer Tableau / comment filtrer un tableau
  // Utiliser fonction render de l'objet media
})

const buildPage = () => {
  document.body.appendChild(container)
  container.appendChild(header)
  header.id = 'header'
  container.appendChild(main)
  container.appendChild(modal)
  modal.id = 'modal'
  modal.className = 'modal'
  main.appendChild(photos)
  photos.id = 'photos'
}
buildPage()
