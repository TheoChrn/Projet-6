import { mediaFactory } from './media.js'

// DOM
const container = document.querySelector('.container')
const main = document.querySelector('main')
const photos = document.createElement('section')

const params = (new URL(document.location)).searchParams
const id = params.get('id')
const getData = () => import('../../data.json')
getData().then(res => {
  const data = res.default
  const photographer = data.photographers.find(p => `${p.id}` === id)
  const media = data.media.filter(m => `${m.photographerId}` === id)
  const lightboxElement = document.getElementById('lightbox')
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
  document.getElementById('profileTagList').innerHTML = `${photographer.tags.map(i => `<li class="tag-name photographer__container__tag-name photographer__container__tag-name--page">#${i}</li>`).join('')}`
  document.getElementById('profilePrice').innerHTML = `${photographer.price}€/jour`

  const isEnterPressed = (enter) => {
    const keyCode = enter.key
    if (keyCode === 'Enter') {
      return keyCode
    }
  }

  const likeCounter = document.getElementById('likeCounter')

  // Créer un nouveau tableau des media avec la méthode mediaFactory
  const mediaFromFactory = media.map(m => mediaFactory(m))

  // Injecte la somme des likes des medias dans le compteur
  likeCounter.innerHTML = mediaFromFactory.map(i => i.likes).reduce((a, b) => a + b)

  // Trie le tableau par nombre de likes
  mediaFromFactory.sort((a, b) => (b.likes - a.likes))

  // Créer un nouveau nom de photographe en remplacement les "-" par des espaces
  const newPhotographerName = photographer.name.replace('-', ' ').split(' ')

  // Retire le nom de famille du photographe
  newPhotographerName.pop()

  // Injecte le nouveau tableau
  photos.innerHTML = mediaFromFactory.map(m => m.createContent(newPhotographerName.join(' '))).join(' ')

  const countLikes = () => {
    const like = document.querySelectorAll('.count-heart')

    // Pour chaque element "like"
    like.forEach(element => {
      // Au clique
      element.addEventListener('click', e => {
        // Cherche si le dataset de la cible est égal à l'id du media
        const media = mediaFromFactory.find(m => `${m.id}` === `${e.target.dataset.mediaid}`)
        // Si non annule
        if (!media) return

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

  const sortX = document.getElementById('sort-x')

  const sortByPopularity = () => {
    sortX.innerHTML = 'Popularité'
    // Tri le tableau par ordre décroissant de likes
    mediaFromFactory.sort((a, b) => (b.likes - a.likes))
    photos.innerHTML = mediaFromFactory.map(i => i.createContent(newPhotographerName.join(' '))).join(' ')
    countLikes()
    lockFocus(lightboxElement)
    photos.querySelectorAll('a').forEach(element => {
      element.addEventListener('click', e => {
        openLightbox(e)
      })
    })
  }

  const popularity = document.getElementById('sort-popularity')

  popularity.addEventListener('click', () => {
    sortByPopularity()
  })

  popularity.addEventListener('keydown', (enter) => {
    if (!isEnterPressed(enter));
    else {
      sortByPopularity()
    }
  })

  const sortByDate = () => {
    sortX.innerHTML = 'Date'
    // Tri le tableau du plus récent au plus vieux
    mediaFromFactory.sort((a, b) => (new Date(b.date) - new Date(a.date)))
    photos.innerHTML = mediaFromFactory.map(i => i.createContent(newPhotographerName.join(' '))).join(' ')
    countLikes()
    lockFocus(lightboxElement)
    photos.querySelectorAll('a').forEach(element => {
      element.addEventListener('click', e => {
        openLightbox(e)
      })
    })
  }

  const date = document.getElementById('sort-date')

  date.addEventListener('click', () => {
    sortByDate()
  })

  date.addEventListener('keydown', (enter) => {
    if (!isEnterPressed(enter));
    else {
      sortByDate()
    }
  })

  const title = document.getElementById('sort-title')

  const sortByTitle = () => {
    sortX.innerHTML = 'Titre'
    // Tri le tableau par ordre alphabétique
    mediaFromFactory.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    photos.innerHTML = mediaFromFactory.map(i => i.createContent(newPhotographerName.join(' '))).join(' ')
    countLikes()
    lockFocus(lightboxElement)
    photos.querySelectorAll('a').forEach(element => {
      element.addEventListener('click', e => {
        openLightbox(e)
      })
    })
  }

  title.addEventListener('click', () => {
    sortByTitle()
  })

  title.addEventListener('keydown', (enter) => {
    if (!isEnterPressed(enter));
    else {
      sortByTitle()
    }
  })

  const dropDownEl = document.getElementById('dropdown-trigger')

  // Au clique
  dropDownEl.addEventListener('click', () => {
    // Active la classe .expanded
    dropDownEl.classList.toggle('expanded')
  })

  const showLightboxAria = () => {
    document.querySelectorAll('[aria-hidden="false"]').forEach(element => {
      element.setAttribute('aria-hidden', 'true')
    })
    lightboxElement.setAttribute('aria-hidden', 'false')
  }

  const hideLightboxAria = () => {
    document.querySelectorAll('[aria-hidden="true"]').forEach(element => {
      element.setAttribute('aria-hidden', 'false')
    })
    lightboxElement.setAttribute('aria-hidden', 'true')
  }

  document.getElementById('content').ariaLabel = `Contactez-moi ${photographer.name}`

  class Lightbox {
    constructor (media) {
      this.media = media
      this.currentIndex = 0
      this.currentMedia = null
    }

    next (e) {
      e.preventDefault()
      if (this.currentIndex === this.media.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
      this.currentMedia = this.media[this.currentIndex]
      this.updateDom()
    }

    prev (e) {
      e.preventDefault()
      if (this.currentIndex === 0) {
        this.currentIndex = this.media.length - 1
      } else {
        this.currentIndex--
      }
      this.currentMedia = this.media[this.currentIndex]
      this.updateDom()
    }

    updateDom () {
      lightboxContainer.innerHTML = this.currentMedia.getMediaAsHTML(newPhotographerName.join(' '))
    }

    open (dataset) {
      lightboxElement.classList.add('active')
      this.currentIndex = this.media.findIndex(m => `${m.id}` === `${dataset}`)
      this.currentMedia = this.media.find(m => `${m.id}` === `${dataset}`)
      this.updateDom()
    }

    close () {
      lightboxElement.classList.remove('active')
    }
  }
  const lightbox = new Lightbox(mediaFromFactory)

  const openLightbox = (e) => {
    lightbox.open(e.target.dataset.mediaid)
    lockFocus(lightboxElement)
    lightboxClose.focus()
    showLightboxAria()
  }

  photos.querySelectorAll('a').forEach(element => {
    element.addEventListener('click', (e) => {
      openLightbox(e)
      element.blur()
    })
  })

  lightboxClose.addEventListener('click', () => {
    lightbox.close()
    hideLightboxAria()
  })

  lightboxPrev.addEventListener('click', (e) => {
    lightbox.prev(e)
  })

  lightboxNext.addEventListener('click', (e) => {
    lightbox.next(e)
  })

  photos.querySelectorAll('a').forEach(element => {
    element.addEventListener('keydown', e => {
      if (!isEnterPressed(e));
      else {
        openLightbox()
      }
    })
  })

  console.log(mediaFromFactory)
})

export function isEnterPressed (enter) {
  const keyCode = enter.key
  if (keyCode === 'Enter') {
    return keyCode
  }
}

/* REPARER LE CODE */
/* AJOUTER LE BLUR SUR LE A POUR ENLEVER LE FOCUS */
