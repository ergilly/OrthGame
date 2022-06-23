const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const startingPos = {x: 1248, y: 912}
class World {
    constructor({ position, image }) {
        this.position = position
        this.image = image
        this.width = this.image.width 
        this.height = this.image.height
    }

    draw() {
        c.drawImage(
            this.image, 
            this.position.x,
            this.position.y,
        )
    }
}

export const offset = {
    x: canvas.width / 2 - startingPos.x,
    y: canvas.height / 2 - startingPos.y
}


const world = new Image()
world.src = '../img/Pellet Town.png'
export const background = new World({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: world
})

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

export const foreground = new World({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage,
    frames: { max: 1 }
})