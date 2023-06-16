class Sprite {
  constructor({position, velocity, image, frames = { max: 1 }, sprites = []})
   {
      this.frames = {...frames, val: 0, elapsed: 0}

      this.position = position
      this.image = image
      this.image.onload = () => {
          this.width = this.image.width / this.frames.max
          this.height = this.image.height
      }

this.moving = false
this.sprites = sprites
  }

  draw() {

      ctx.drawImage(
          this.image,
          this.frames.val * this.width, //x coord for crop
          0, //y crop 
          this.image.width / this.frames.max, //crop from left to right of img
          this.image.height, //full length of crop img
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height //last for arguments are the actual positioning of sprite on screen
      )
      if(!this.moving) return
      if (this.frames.max > 1 ) {
        this.frames.elapsed ++ 
      }
      if(this.frames.elapsed % 10 === 0){

      if (this.frames.val < this.frames.max- 1) 
      this.frames.val++
      else this.frames.val = 0  //this is statment itterates over the 4 sprite images in a row and prevents them from going past the frouth image 
      }
  }
}

class Boundary {
  static width = 64;  //the number represents the pixel square size*the zoom level 
  static height = 64;
  constructor({ position }) {
      this.position = position
      this.width = 64   //pre positioning boundaries based on the 400percent zoom map
      this.height = 64
  }
  draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.0)' //this makes the boundaries invisible  
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Interaction {
  static width = 64;  //the number represents the pixel square size*the zoom level 
  static height = 64;
  constructor({ position }) {
      this.position = position
      this.width = 64   //pre positioning boundaries based on the 400percent zoom map
      this.height = 64
  }
  if 
  draw() {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)' //this makes the boundaries invisible  
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}