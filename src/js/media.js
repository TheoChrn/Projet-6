class Media {
  constructor (id, photographerId, tags, likes, date, price, src, alt) {
    this.id = id
    this.photographerId = photographerId
    this.tags = tags
    this.likes = likes
    this.date = date
    this.price = price
    this.src = src
    this.alt = alt
  }

  getMediaAsHTML () { }

  createContent () { }

  addLike () {
    this.likes++
    return this.likes
  }
}

class Image extends Media {
  createContent (name) {
    return `
    <article class="photo">
    <a href="#" data-mediaid="${this.id}">
      <div class="photo__container">
        <figure class="photo__container__picture">
          <img tab-index="0" data-mediaid="${this.id}" src="./src/public/assets/images/${name}/${this.src}" class="src thumb photo__container__thumb" alt="${this.alt}">
        </figure>
      </div>
    </a>
    <div class="photo__description">
      <h2 class="name photo__description__name">${this.alt}</h2>
      <div class="photo__description__infos">
        <span class="price photo__description__price">${this.price}€</span>
        <div class="photo__description__like"">
          <span id="count_${this.id}" class="number photo__description__like__number">${this.likes}</span>
          <button data-mediaid="${this.id}" class="heart count-heart" aria-label="Ajouter un like">Ajouter un like</button>
        </div>
      </div>
    </div>
  </article>
  `
  }

  getMediaAsHTML (name) {
    return `
    <img src="./src/public/assets/images/${name}/${this.src}" alt="${this.alt}">
    `
  }
}

class Video extends Media {
  createContent (name) {
    return `
    <article class="photo">
    <a href="#" data-mediaid="${this.id}">
      <div class="photo__container">
        <figure class="photo__container__picture">
          <video data-mediaid="${this.id}" class="src thumb photo__container__thumb" aria-label="${this.alt}" title="${this.alt}">
            <source tab-index="0" src="./src/public/assets/images/${name}/${this.src}" type="video/mp4">
          </video>
        </figure>
      </div>
    </a>
    <div class="photo__description">
      <h2 class="name photo__description__name">${this.alt}</h2>
      <div class="photo__description__infos">
        <span class="price photo__description__price">${this.price}€</span>
        <div class="photo__description__like">
        <span id="count_${this.id}"  class="number photo__description__like__number">${this.likes}</span>
        <button data-mediaid="${this.id}" class="heart count-heart" aria-label="Ajouter un like">Ajouter un like</button>
        </div>
      </div>
    </div>
  </article>`
  }

  getMediaAsHTML (name) {
    return `
    <video controls>
          <source src="./src/public/assets/images/${name}/${this.src}" type="video/mp4">
    </video>
    `
  }
}

export function mediaFactory (obj) {
  if (obj.image !== undefined) {
    return new Image(obj.id, obj.photographerId, obj.tags, obj.likes, obj.date, obj.price, obj.image, obj.alt)
  } else if (obj.video !== undefined) {
    return new Video(obj.id, obj.photographerId, obj.tags, obj.likes, obj.date, obj.price, obj.video, obj.alt)
  }
}
