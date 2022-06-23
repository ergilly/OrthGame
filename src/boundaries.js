import { collisions } from '../data/collisions.js'
import { offset } from './world.js'

class Boundary {
    static width = 48
    static height = 48

    constructor({ position }) {
        this.position = position,
        this.width = Boundary.width,
        this.height = Boundary.height
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70 ) {
    collisionsMap.push(collisions.slice(i, i + 70))
}

export const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1025) {
            boundaries.push(
                new Boundary(
                    {
                        position: {
                            x: j * Boundary.width + offset.x,
                            y: i * Boundary.height + offset.y
                        }
                    }
                )
            ) 
        }
    })
})

export function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
}