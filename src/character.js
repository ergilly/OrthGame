export class Character {
    constructor({ position, image, frames, sprites }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.width = this.image.width / this.frames.max
        this.height = this.image.height
        this.moving = false
        this.sprites = sprites
    }
    
}