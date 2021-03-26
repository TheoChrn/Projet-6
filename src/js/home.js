const fetch = require('node-fetch')
const url = 'https://raw.githubusercontent.com/Volturuss/Projet-6/development_photographer_page-factory/data.json'
// const container = document.querySelector('#container')

console.log(fetch(url))

/* fetch(url)
  .then(res => res.json())
  .then(data => {
    data.photographers.forEach(p => {
      container.innerHTML += ` <article class="photographer">
                      <a href="">
                          <div class="photographer__idContainer">
                              <figure class="photographer__idContainer__picture">
                                  <img src="${p.portrait}" class="user photographer__idContainer__user" alt="">
                          </figure>
                          <h2 class="name photographer__idContainer__name">${p.name}</h2>
                          </div>
                      </a>
                      <div class="photographer__container">
                          <h3 class="location photographer__container__location">${p.city}, ${p.country}</h3>
                          <p class="description photographer__container__description">${p.tagline}</p>
                          <small class="photographer__container__price">${p.price}/jour</small>
                          <ul class="photographer__container__hashtags">
                              <a href="#"><li class="tag-name photographer__container__tag-name">#${p.tags[0]}</li></a>
                              <a href="#"><li class="tag-name photographer__container__tag-name">#${p.tags[1]}</li></a>
                              <a href="#"><li class="tag-name photographer__container__tag-name">#${p.tags[2]}</li></a>
                              <a href="#"><li class="tag-name photographer__container__tag-name">#${p.tags[3]}</li></a>
                          </ul>
                      </div>
                  </article> `
    })
  }) */
