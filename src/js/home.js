const fetch = require('node-fetch')
const url = 'https://raw.githubusercontent.com/Volturuss/Projet-6/development_photographer_page-factory/data.json'
const container = document.querySelector('#container')
const tag = document.querySelectorAll('.tag-name')
const main = document.createElement('main')
const section = document.createElement('section')
const h1 = document.createElement('h1')
const header = document.createElement('header')
// const ul = document.createElement(ul)

const searchPhotographers = () => {
  fetch(url)
    .then(res => {
      if (res.ok) {
        res.json()
          .then(async data => {
            console.log(data)
            const photographers = data.photographers
            const newPhotographers = photographers.filter(p => {
              return p.tags.includes('events')
            })
            console.log(newPhotographers)
            const arr = []
            const set = new Set(data.photographers.map(p => p.tags).reduce((p, c) => [...c, ...p]))
            set.forEach(e => {
              arr.push(`<a href="#"><li class="tag-name photographer__container__tag-name">#${e}</li></a>`)
            })
            console.log()
            const logo = await import('../public/assets/images/logo.png')
            header.innerHTML +=
              `
            <figure id="logo">
                <a href="#">
                <img src="${logo.default}" alt="Fisheye Home page" class="logo">
                </a>
            </figure>

            <nav id="header__nav">
                <ul id="header__nav__list">
                  ${arr.map(i => i).join('')}
                </ul>
            </nav>
            `
            data.photographers.forEach(async p => {
              const url = await import(`../public/assets/images/Photographers_ID_Photos/${p.portrait}`)
              console.log(url.default)
              // ${p.name.toLowerCase().replace(/\s/g, '')}
              section.innerHTML +=
                `
              <article class="photographer">
              <a href="profil.html?id=${p.id}">
                  <div class="photographer__idContainer">
                      <figure class="photographer__idContainer__picture">
                          <img src="${url.default}" class="user photographer__idContainer__user" alt="">
                  </figure>
                  <h2 class="name photographer__idContainer__name">${p.name}</h2>   
                  </div>
              </a>
              <div class="photographer__container">
                  <h3 class="location photographer__container__location">${p.city}, ${p.country}</h3>
                  <p class="description photographer__container__description">${p.tagline}</p>
                  <small class="photographer__container__price">${p.price}€/jour</small>
                  <ul class="photographer__container__hashtags">
                  ${p.tags.map(i => `<a href="#"><li class="tag-name photographer__container__tag-name">#${i}</li></a>`).join('')}
                    
                  </ul>
              </div>
              </article>
              `
            })
          })
      } else {
        console.log('Erreur')
      }
    })
}

searchPhotographers()

const buildPage = () => {
  document.body.appendChild(container)
  container.appendChild(header)
  header.id = 'header'
  container.appendChild(main)
  main.appendChild(section)
  section.appendChild(h1)
  h1.innerHTML = 'Photographes'
  section.id = 'photographers'
}

buildPage()

for (let i = 0; i < tag.length; i++) {
  tag.addEventListener('click', (e) => {
    if (e.target.value && e.target.className === '.tag-name') {
      console.log(e.target.value)
    }
  })
}
