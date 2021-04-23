class Media {
  constructor (id, photographerId, tags, likes, date, price, src) {
    this.id = id
    this.photographerId = photographerId
    this.tags = tags
    this.likes = likes
    this.date = date
    this.price = price
    this.src = src
  }
  createContent() {}
}

class Image extends Media {
  createContent() {
    return `
    <article class="photo">
    <a href="#">
      <div class="photo__container">
        <figure class="photo__container__picture">
        <img src="../public/assets/images/${photographer.name}/${this.src}" class="">
        </figure>
      </div>
    </a>
    <div class="photo__description">
      <h2 class="name photo__description__name">Arc-en-ciel</h2>
      <div class="photo__description__infos">
        <small class="price photo__description__price">${this.price}€</small>
        <div class="photo__description__like">
          <small class="number photo__description__like__number">${this.likes}</small>
          <i class="heart fas fa-heart"></i>
        </div>
      </div>
    </div>
  </article>
  `
  } 
}

class Video extends Media {
  createContent() {
    return `<article class="photo">
    <a href="#">
      <div class="photo__container">
        <figure class="photo__container__picture">
        <video src="${this.src}" class="">
        </figure>
      </div>
    </a>
    <div class="photo__description">
      <h2 class="name photo__description__name">Arc-en-ciel</h2>
      <div class="photo__description__infos">
        <small class="price photo__description__price">${this.price}€</small>
        <div class="photo__description__like">
          <small class="number photo__description__like__number">${this.likes}</small>
          <i class="heart fas fa-heart"></i>
        </div>
      </div>
    </div>
  </article>`
  }
}

export function mediaFactory(obj) {
  if (obj.hasOwnProperty('image')){
    return new Image(obj.id, obj.photographerId, obj.tags, obj.likes, obj.date, obj.price, obj.image)
  }
  else if (obj.hasOwnProperty('video')){
    return new Video(obj.id, obj.photographerId, obj.tags, obj.likes, obj.date, obj.price, obj.video)
  }
}

