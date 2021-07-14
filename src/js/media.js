class Media {
  constructor(id, photographerId, tags, likes, date, price, src) {
    this.id = id
    this.photographerId = photographerId
    this.tags = tags
    this.likes = likes
    this.date = date
    this.price = price
    this.src = src
    this.name = this.clearMediaName()
  }

  getMediaAsHTML() { }

  createContent() { }

  clearMediaName() {

    // Stock le chemin du média
    let name = this.src

    // Remplace ce qui n'est pas un chiffre ou une lettre par un espace et divise la chaîne de caractère dans un tableau
    name = name.replace(/[^0-9a-zA-Z]/g, ' ').toLowerCase().split(' ')

    // Supprime le premier élément du tableau
    name.shift()

    // Supprime le dernier élement du tableau
    name.pop()

    // Fusionne les élements du tableau en spérants les différentes chaînes par un espace
    name = name.join(' ')

    // Renvois un objet tableau contenant le nouveau nom du média
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  
  addLike() {
    this.likes++
    return this.likes
  }
}

class Image extends Media {
  createContent(name, title) {
    return `
    <article class="photo">
    <a href="#" tab-index="-1">
      <div class="photo__container">
        <figure class="photo__container__picture">
          <img tab-index="0" data-mediaid="${this.id}" src="./src/public/assets/images/${name}/${this.src}" class="src thumb photo__container__thumb" alt="${title}">
        </figure>
      </div>
    </a>
    <div class="photo__description">
      <h2 class="name photo__description__name">${title}</h2>
      <div class="photo__description__infos">
        <span class="price photo__description__price">${this.price}€</span>
        <div class="photo__description__like" data-mediaid="${this.id}">
          <span id="count_${this.id}" class="number photo__description__like__number">${this.likes}</span>
          <i class="heart fas fa-heart "></i>
        </div>
      </div>
    </div>
  </article>
  `
  }

  getMediaAsHTML(name) { 
    return `
    <img src="./src/public/assets/images/${name}/${this.src}" alt="${this.name}">
    `
  }
}

class Video extends Media {
  createContent(name, title) {
    return`
    <article class="photo">
    <a href="#" tab-index="-1">
      <div class="photo__container">
        <figure class="photo__container__picture">
          <video data-mediaid="${this.id}" class="src thumb photo__container__thumb" aria-label="${title}" title="${title}">
            <source tab-index="0" src="./src/public/assets/images/${name}/${this.src}" type="video/mp4">
          </video>
        </figure>
      </div>
    </a>
    <div class="photo__description">
      <h2 class="name photo__description__name">${title}</h2>
      <div class="photo__description__infos">
        <span class="price photo__description__price">${this.price}€</span>
        <div class="photo__description__like" data-mediaid="${this.id}">
        <span id="count_${this.id}"  class="number photo__description__like__number">${this.likes}</span>
          <i class="heart fas fa-heart"></i>
        </div>
      </div>
    </div>
  </article>`
  }

  getMediaAsHTML(name) { 
    return `
    <video controls>
          <source src="./src/public/assets/images/${name}/${this.src}" type="video/mp4">
    </video>
    `
  }
}

export function mediaFactory(obj) {
  if (obj.hasOwnProperty('image')) {
    return new Image(obj.id, obj.photographerId, obj.tags, obj.likes, obj.date, obj.price, obj.image)
  } else if (obj.hasOwnProperty('video')) {
    return new Video(obj.id, obj.photographerId, obj.tags, obj.likes, obj.date, obj.price, obj.video)
  }
}
