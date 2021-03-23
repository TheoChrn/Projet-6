class Media{
  constructor(id, photographerId, tags, likes, date, price){
    this.id = id
    this.photographerId = photographerId
    this.tags = tags
    this.likes = likes
    this.date = date
    this.price = price
  }
}

class Video extends Media{
  constructor(id, photographerId, video ,tags, likes, date, price){
    super(id, photographerId, tags, likes, date, price)
    this.video = video
  }
}

class Image extends Media{
  constructor(id, photographerId, image ,tags, likes, date, price){
    super(id, photographerId, tags, likes, date, price)
    this.image = image
  }
}