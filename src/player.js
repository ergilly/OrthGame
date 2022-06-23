const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
import { Character } from './character.js'
import { background, foreground } from './world.js'
import { boundaries, rectangularCollision } from './boundaries.js'
import { charCreateUI } from './characterCreate.js'



class Player extends Character {
    constructor({ position, image, hairImage, frames, sprites }){
        super({ position, image, frames, sprites })
        this.hairStyle = 0
        this.hairImage = hairImage
        this.moving = false
        this.moveSpeed = 3
        this.direction = 1
        this.shift = 0
    }

    draw() {
        const updatePlayerHairImage = new Image()
        updatePlayerHairImage.src = `./img/characterSprite/${hairStyles[this.hairStyle]}.png`
        this.hairImage = updatePlayerHairImage
        c.save()
        c.scale(this.direction, 1)
        c.drawImage(
            this.image, 
            this.frames.val * this.width, 
            0, 
            this.width, 
            this.height, 
            this.position.x + this.shift, 
            this.position.y, 
            this.width * 3 * this.direction, 
            this.height * 3
        )
        c.drawImage(
            this.hairImage, 
            this.frames.val * this.width, 
            0, 
            this.width, 
            this.height, 
            this.position.x + this.shift, 
            this.position.y, 
            this.width * 3 * this.direction,
            this.height * 3
        )
        c.restore()
        if(this.frames.max > 1) {
            this.frames.elapsed++
        }
        if(this.frames.elapsed % 10 === 0){
            if(this.frames.val < this.frames.max -1) {this.frames.val++}
            else {this.frames.val = 0}
        }
    }
}

const playerImage = new Image()
playerImage.src = './img/characterSprite/baseChar.png'

const hairStyles = [ 'bowlHair', 'curlyHair', 'longHair', 'mopHair', 'shortHair', 'spikeyHair', 'baldHair' ]

const playerHairImage = new Image()
playerHairImage.src = `./img/characterSprite/${hairStyles[0]}.png`


const noOfSprites = 9;
const playerImageSize = {w: playerImage.width, h: playerImage.height}
const spriteSize = {w: playerImageSize.w / noOfSprites , h: playerImage.height}

export const player = new Player({
    position: {
        x: canvas.width/2 - spriteSize.w * 1.5,
        y: canvas.height/2 - spriteSize.h * 1.5,
    },
    image: playerImage,
    hairImage: playerHairImage,
    frames: { max: noOfSprites },
})

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}

const movables = [background, ...boundaries, foreground]
function move(xSpeed, ySpeed, lastKeys) {
    let direction = 1
    lastKeys.forEach((key) => {
        if(key == 'a') {
            direction = -1
        } else if (key == 'd') {
            direction = 1
        }
    })
    player.direction = direction
    direction == 1 ? player.shift = 0 : player.shift = -player.width * player.frames.max * 2 + player.width
    player.moving = true
    const playerHitbox = {
        position: {x: canvas.width/2 - 4, y: canvas.height/2 + 1 },
        width: 8,
        height: 20
    }
    for( let i = 0; i < boundaries.length; i++ ) {
        const boundary = boundaries[i]
        if(
            rectangularCollision({
                rectangle1: playerHitbox,
                rectangle2: {...boundary, position: {
                    x: boundary.position.x + xSpeed,
                    y: boundary.position.y + ySpeed
                }}
            })
        ) {
            player.moving = false
            break
        }
    }
    if(player.moving && !charCreateUI.displayUI) {
        movables.forEach((movable) => { movable.position.x += xSpeed, movable.position.y += ySpeed })
    }
}

export function playerControl() {
    player.moving = false
    if(keys.w.pressed && lastKeys[lastKeys.length-1] == 'w') { move(0, player.moveSpeed, lastKeys) }
    else if(keys.a.pressed && lastKeys[lastKeys.length-1] == 'a') { move(player.moveSpeed, 0, lastKeys) }
    else if(keys.s.pressed && lastKeys[lastKeys.length-1] == 's') { move(0, -player.moveSpeed, lastKeys) }
    else if(keys.d.pressed && lastKeys[lastKeys.length-1] == 'd') { move(-player.moveSpeed, 0, lastKeys) }
}

let lastKeys = []
window.addEventListener('keydown', (e) => {
    for(let key of Object.keys(keys)) {
        if(e.key == key) {
            keys[key].pressed = true
            lastKeys[lastKeys.length-1] != key ? lastKeys.push(key) : null
        }
    }
    if (lastKeys.length > 4) {
        lastKeys.shift()
    }
})

window.addEventListener('keyup', (e) => {
    for(let key of Object.keys(keys)) {
        if(e.key == key) {
            keys[key].pressed = false
            lastKeys.length > 1 && lastKeys[lastKeys.length-1] == key ? lastKeys.pop() : null
        }
    }
})

// window.addEventListener('click', (e) => {
    
// })