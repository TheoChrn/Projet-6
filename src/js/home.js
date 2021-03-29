const fetch = require('node-fetch')
const url = 'https://raw.githubusercontent.com/Volturuss/Projet-6/development_photographer_page-factory/data.json'
const container = document.querySelector('#container')
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
            data.photographers.forEach(p => {
              section.innerHTML +=
              `
              <article class="photographer">
              <a href="${p.name.toLowerCase().replace(/\s/g, '')}.html">
                  <div class="photographer__idContainer">
                      <figure class="photographer__idContainer__picture">
                          <img src="../public/assets/images/Photographers_ID_Photos/${p.portrait}" class="user photographer__idContainer__user" alt="">
                  </figure>
                  <h2 class="name photographer__idContainer__name">${p.name}</h2>   
                  </div>
              </a>
              <div class="photographer__container">
                  <h3 class="location photographer__container__location">${p.city}, ${p.country}</h3>
                  <p class="description photographer__container__description">${p.tagline}</p>
                  <small class="photographer__container__price">${p.price}/jour</small>
                  <ul class="photographer__container__hashtags">
                    <a href="#"><li class="tag-name photographer__container__tag-name">#${p.tags}</li></a>
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

const buildPhotographers = () => {
  searchPhotographers()
}

buildPhotographers()
document.body.appendChild(container)
container.appendChild(main)
main.appendChild(section)
section.appendChild(h1)
