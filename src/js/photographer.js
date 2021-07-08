import { mediaFactory } from './media.js'

// DOM
const container = document.querySelector('.container')
const main = document.querySelector('main')
const photos = document.createElement('section')

const params = (new URL(document.location)).searchParams
const id = params.get('id')
const getData = () => import('../../data.json')
getData().then(async res => {
  const data = res.default
  const photographer = data.photographers.find(p => `${p.id}` === id)
  const media = data.media.filter(m => `${m.photographerId}` === id)

  /////////////////////// LIGHTBOX ///////////////////////
  const lightbox = document.getElementById('lightbox')
  const lightboxContainer = document.querySelector('.lightbox__container')
  const lightboxClose = document.querySelector('.lightbox__close')
  const lightboxPrev = document.querySelector('.lightbox__prev')
  const lightboxNext = document.querySelector('.lightbox__next')

  // Si le photographe n'existe pas, renvoie vers la page d'accueil
  if (photographer === undefined) {
    window.location = 'index.html'
  }

  document.title = `${photographer.name}`

  const buildPage = () => {
    document.body.appendChild(container)
    container.appendChild(main)
    main.appendChild(photos)
    photos.id = 'photos'
  }
  buildPage()

  // Injecte les différentes propriété de l'objet dans les balises HTML
  const profilePortrait = document.getElementById('profilePortrait')
  profilePortrait.src = `./src/public/assets/images/Photographers_ID_Photos/${photographer.portrait}`
  profilePortrait.alt = photographer.name
  document.getElementById('profileName').innerHTML = photographer.name
  document.getElementById('profileLocation').innerHTML = `${photographer.city}, ${photographer.country}`
  document.getElementById('profileTagLine').innerHTML = photographer.tagline
  document.getElementById('profileTagList').innerHTML = `${photographer.tags.map(i => `<a href="#"><li class="tag-name photographer__container__tag-name photographer__container__tag-name--page">#${i}</li></a>`).join('')}`
  document.getElementById('profilePrice').innerHTML = `${photographer.price}€/jour`

  // Créer un nouveau tableau des media avec la méthode mediaFactory
  const mediaFromFactory = media.map(m => mediaFactory(m))

  // Injecte la somme des likes des medias dans le compteur
  likeCounter.innerHTML = mediaFromFactory.map(i => i.likes).reduce((a, b) => a + b)

  // Trie le tableau par nombre de likes
  mediaFromFactory.sort((a, b) => (b.likes - a.likes))

  // Créer un nouveau nom de photographe en remplacement les "-" par des espaces 
  let newPhotographerName = photographer.name.replace('-', ' ').split(' ')

  // Retire le nom de famille du photographe
  newPhotographerName.pop()

  // Injecte le nouveau tableau 
  photos.innerHTML = mediaFromFactory.map(m => m.createContent(newPhotographerName.join(' '), m.name)).join(' ')

  // REPLACER EN HAUT DU FICHIER

  const countLikes = () => {
    const likeCounter = document.getElementById('likeCounter')
    const like = document.querySelectorAll('.heart')

    // Pour chaque element "like"
    like.forEach(element => {

      // Au clique
      element.addEventListener('click', e => {

        // Cherche si le dataset de la cible est égal à l'id du media
        const media = mediaFromFactory.find(m => m.id == e.target.dataset.mediaid)

        // Si non annule
        if (!media) return;

        // Récupère le conteneur de like
        const likeNumber = document.getElementById(`count_${media.id}`)

        // Ajoute un like au conteneur du media
        likeNumber.innerHTML = media.addLike()

        // Injecte la nouvelle somme des likes des medias dans le compteur
        likeCounter.innerHTML = mediaFromFactory.map(i => i.likes).reduce((a, b) => a + b)
      })
    })
  }
  countLikes()

  let currentIndex

  const x = () => {

    // Pour chaque élément de lightBoxMedia
    document.querySelectorAll('.src').forEach(element => {
      console.log(element)

      // Au click
      element.addEventListener('click', e => {

        document.querySelectorAll('[aria-disable="false"]').forEach(element => {
          element.setAttribute('aria-disable' , 'true')
        })
      
        // Cherche si le dataset de la cible est égal à l'id du media
        const media = mediaFromFactory.find(m => m.id == e.target.dataset.mediaid)
        
        // Si non annule
        if (!media) return;

        // Active la class '.active'
        lightbox.classList.add('active')

        // Injecte la balise du média dans le container de la lightbox
        lightboxContainer.innerHTML = media.getMediaAsHTML(newPhotographerName.join(' '))

        // Cherche et stock l'index du média
        currentIndex = mediaFromFactory.findIndex(m => m.id == e.target.dataset.mediaid)
      })
    })
  }
  x()

  const sortX = document.getElementById('sort-x')

  document.getElementById('sort-popularity').addEventListener('click', () => {
    sortX.innerHTML = 'Popularité'

    // Tri le tableau par ordre décroissant de likes
    mediaFromFactory.sort((a, b) => (b.likes - a.likes))
    photos.innerHTML = mediaFromFactory.map(i => i.createContent(newPhotographerName.join(' '), i.name)).join(' ')
    countLikes()
    x()
  })

  document.getElementById('sort-date').addEventListener('click', () => {
    sortX.innerHTML = 'Date'

    // Tri le tableau du plus récent au plus vieux
    mediaFromFactory.sort((a, b) => (new Date(b.date) - new Date(a.date)))
    photos.innerHTML = mediaFromFactory.map(i => i.createContent(newPhotographerName.join(' '), i.name)).join(' ')
    countLikes()
    x()
  })

  document.getElementById('sort-title').addEventListener('click', () => {
    sortX.innerHTML = 'Titre'

    // Tri le tableau par ordre alphabétique
    mediaFromFactory.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    photos.innerHTML = mediaFromFactory.map(i => i.createContent(newPhotographerName.join(' '), i.name)).join(' ')
    countLikes()
    x()
  })

  const dropDownEl = document.getElementById('dropdown-trigger')

  // Au clique
  dropDownEl.addEventListener('click', () => {

    // Active la classe .expanded
    dropDownEl.classList.toggle('expanded')
  })

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active')
    document.querySelectorAll('[aria-disable="true"]').forEach(element => {
      element.setAttribute('aria-disable' , 'false')
    })
  })

  lightboxPrev.addEventListener('click', e => {

    // Annule le comportement par défaut
    e.preventDefault()

    // Si l'index = 0
    if (currentIndex == 0) {

      // Alors prend l'index du dernier élément du tableau
      currentIndex = mediaFromFactory.length - 1
    } else {

      // Sinon soustrait 1
      currentIndex--
    }

    // Injecte la balise du média avec le nouvel index dans le container de la lightbox
    lightboxContainer.innerHTML = mediaFromFactory[currentIndex].getMediaAsHTML(newPhotographerName.join(' '))
  })

  lightboxNext.addEventListener('click', e => {

    // Annule le comportement par défaut
    e.preventDefault()

    // Si l'index est égal au dernier élément du tableau
    if (currentIndex == mediaFromFactory.length - 1) {

      // Alors prends l'index du premier élément du tableau
      currentIndex = 0
    } else {

      // Sinon ajoute 1
      currentIndex++
    }

    // Injecte la balise du média avec le nouvel index dans le container de la lightbox
    lightboxContainer.innerHTML = mediaFromFactory[currentIndex].getMediaAsHTML(newPhotographerName.join(' '))
  })

  document.getElementById('content').ariaLabel = `Contactez-moi ${photographer.name}`
})
