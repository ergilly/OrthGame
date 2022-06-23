import { background, foreground } from './src/world.js'
import { player, playerControl } from './src/player.js'
import { characterCreate, charCreateUI } from './src/characterCreate.js'

class Index {
    constructor({}) {
        this.gameScreen = { w: 1920, h: 1080 }
    }
}
export const index = new Index({})

function animate() {
    background.draw()
    player.draw()
    foreground.draw()
    charCreateUI.displayUI ? characterCreate() : null
    
    playerControl()
    window.requestAnimationFrame(animate)
}
window.requestAnimationFrame(animate)

