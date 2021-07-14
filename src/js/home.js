const fetch = require('node-fetch')
const url = 'https://raw.githubusercontent.com/Volturuss/Projet-6/development_photographer_page-factory/data.json'
const container = document.querySelector('.container')
const main = document.createElement('main')
const section = document.createElement('section')
const h1 = document.createElement('h1')

const searchPhotographers = () => {
  fetch(url)
    .then(res => {
      if (res.ok) {
        res.json()
          .then(data => {
            console.log(data)
            const photographers = data.photographers
            const arr = []

            // Créer un tableau de valeurs unique
            const set = new Set(data.photographers.map(p => p.tags).reduce((p, c) => [...c, ...p]))

            // Pour chaque élement dans set
            set.forEach(e => {

              // Rentre une li contenant un tag dans le tableau
              arr.push(`<a href="#"><li class="tag-name nav-tag photographer__container__tag-name"  aria-label="${e}" data-value="${e}">#${e}</li></a>`)
            })

            // Injecte le tableau dans une balide <ul>
            document.getElementById('header__nav__list').innerHTML = arr.map(i => i).join('')
            
            data.photographers.forEach(p => {
              section.innerHTML +=
                `
              <article class="photographer">
                <a href="profil.html?id=${p.id}">
                    <div class="photographer__idContainer">
                        <figure class="photographer__idContainer__picture">
                            <img src="./src/public/assets/images/Photographers_ID_Photos/${p.portrait}" class="user photographer__idContainer__user" alt="${p.name}">
                    </figure>
                    <h2 class="name photographer__idContainer__name">${p.name}</h2>   
                    </div>
                </a>
                <div class="photographer__container">
                    <h3 class="location photographer__container__location">${p.city}, ${p.country}</h3>
                    <p class="description photographer__container__description">${p.tagline}</p>
                    <small class="photographer__container__price">${p.price}€/jour</small>
                    <ul class="photographer__container__hashtags">
                    ${p.tags.map(i => `<li class="tag-name photographer__container__tag-name">#${i}</li>`).join('')}
                      
                    </ul>
                </div>
              </article>
              `
            })

            const tag = document.querySelectorAll('.nav-tag')

            // Tant que i est inférieur au nombre de tag ajoute 1
            for (let i = 0; i < tag.length; i++) {

              // Au clique
              tag[i].addEventListener('click', (e) => {

                // Réinitialise le champs
                section.innerHTML = ''

                // Filtre les photographes en fonction de la valeur du tag
                const newPhotographers = photographers.filter(p => {
                  return p.tags.includes(e.target.dataset.value)
                })

                section.appendChild(h1)
                h1.innerHTML = 'Photographes'
                section.id = 'photographers'

                // Pour chaque photographe filtré
                newPhotographers.forEach(p => {

                  // Injecte le contenu
                  section.innerHTML +=
                    `
                <article class="photographer">
                <a href="profil.html?id=${p.id}">
                    <div class="photographer__idContainer">
                        <figure class="photographer__idContainer__picture">
                            <img src="./src/public/assets/images/Photographers_ID_Photos/${p.portrait}" class="user photographer__idContainer__user" alt="">
                    </figure>
                    <h2 class="name photographer__idContainer__name">${p.name}</h2>   
                    </div>
                </a>
                <div class="photographer__container">
                    <h3 class="location photographer__container__location">${p.city}, ${p.country}</h3>
                    <p class="description photographer__container__description">${p.tagline}</p>
                    <small class="photographer__container__price">${p.price}€/jour</small>
                    <ul class="photographer__container__hashtags">
                    ${p.tags.map(i => `<a href="#"><li class="tag-name photographer__container__tag-name data-value="${e}"">#${i}</li></a>`).join('')}
                    </ul>
                </div>
                </article>
                `
                })
              })
            }
          })
      } else {
        console.log('Erreur')
      }
    })
}

searchPhotographers()

const buildPage = () => {
  document.body.appendChild(container)
  container.appendChild(main)
  main.appendChild(section)
  section.appendChild(h1)
  h1.innerHTML = 'Photographes'
  section.id = 'photographers'
}

buildPage()
