import { player } from './player.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

class CharCreate {
    constructor({}) {
        this.displayUI = true
    }
}
export const charCreateUI = new CharCreate({})

class Background {
    constructor({ position, image }) {
        this.position = position
        this.image = image
        this.width = 960 
        this.height = 640
    }
    draw() {
        c.drawImage(
            this.image, 
            this.position.x,
            this.position.y,
        )
    }
}

class Button {
    constructor({ position, image, frames, size }) {
        this.position = position
        this.image = image
        this.width = size.w
        this.height = size.h
        this.pressed = false
        this.frames = {...frames, val: 0}
    }
    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.width / this.frames.max,
            this.height,
            this.position.x,
            this.position.y,
            this.width / this.frames.max,
            this.height
        )
    }
}

class Character {
    constructor({ imageBase, hairStyles, frames }) {
        this.position = background.position
        this.imageBase = imageBase
        this.hairStyles = hairStyles
        this.width = 960 * frames.max 
        this.height = 640
        this.frames = {...frames, val: 0, elapsed: 0}
        this.currentHair = 0
    }
    draw() {
        c.drawImage(
            this.imageBase, 
            this.frames.val * this.width / this.frames.max,
            0,
            this.width / this.frames.max,
            this.height,
            this.position.x,
            this.position.y,
            this.width / this.frames.max,
            this.height
        )
        c.drawImage(
            this.hairStyles[this.currentHair], 
            this.frames.val * this.width / this.frames.max,
            0,
            this.width / this.frames.max,
            this.height,
            this.position.x,
            this.position.y,
            this.width / this.frames.max,
            this.height
        )
    
        if(this.frames.max > 1) {
            this.frames.elapsed++
        }
        if(this.frames.elapsed % 10 === 0){
            if(this.frames.val < this.frames.max -1) {this.frames.val++}
            else {this.frames.val = 0}
        }
    }
}

class Text {
    constructor({}) {
        this.position = { x: 720, y: 310 }
        this.currentCharPos = this.position
        this.enabled = false
        this.maxCharacters = 12
        this.name = ''
        this.characterImages = []
    }
    
    draw() {
        for( let i = 0; i < this.name.length; i++ ) {
            
            if(this.characterImages[i] !== undefined) {
                c.drawImage(
                    this.characterImages[i], 
                    this.position.x + 40 * i,
                    this.position.y,
                )
            }
        }
    }
}

const acceptedChars = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
const characterImages = {}
acceptedChars.forEach((character) => {
    characterImages[character.toLowerCase()] = new Image()
    characterImages[character.toLowerCase()].src = `../img/font/${character}.png`
})
const text = new Text({})

const cursorImage = new Image()
cursorImage.src = '../img/font/cursor.png'

class Cursor {
    constructor({ image }) {
        this.image = image
        this.width = this.image.width
        this.height = this.image.height
        this.frames = { max: 2, val: 0, elapsed: 0 }
        this.stop = false
    }

    draw() {
        let posX = text.position.x
        if(text.name.length < text.maxCharacters) {
            posX = text.position.x + 40 * text.name.length
            this.stop = false
        } else {
            this.stop = true
        }
        c.drawImage(
            this.image, 
            this.frames.val * this.width / this.frames.max,
            0,
            this.width / this.frames.max,
            this.height,
            text.position.x + 40 * text.name.length,
            text.position.y,
            this.width / this.frames.max,
            this.height
        )
        if(!this.stop){
            if(this.frames.max > 1) {
                this.frames.elapsed++
            }
            if(this.frames.elapsed % 50 === 0){
                if(this.frames.val < this.frames.max -1) {
                    this.frames.val++
                }
                else {
                    this.frames.val = 0
                }
            }
        } else {
            this.frames.val = 1
        }
    }
}

const cursor = new Cursor({
    image: cursorImage,
})

const menuBackground = new Image()
menuBackground.src = '../img/characterCreate/char_create_background.png'

const background = new Background({ 
    position: {
        x: canvas.width / 2 - menuBackground.width / 2,
        y: canvas.height / 2 - menuBackground.height / 2
    },
    image: menuBackground
})

const leftArrow = new Image()
leftArrow.src = '../img/characterCreate/left_arrow.png'
const rightArrow = new Image()
rightArrow.src = '../img/characterCreate/right_arrow.png'

const leftButton = new Button({
    position: {
        x: background.position.x + 230,
        y: background.position.y + 250
    },
    image: leftArrow,
    frames: {max: 2},
    size: {w: 220, h: 120}
})
const rightButton = new Button({
    position: {
        x: background.position.x + 620,
        y: background.position.y + 250
    },
    image: rightArrow,
    frames: {max: 2},
    size: {w: 220, h: 120}
})

const confirm = new Image()
confirm.src = '../img/characterCreate/confirm_button.png'

const confirmButton = new Button({
    position: {
        x: background.position.x + 430,
        y: background.position.y + 420
    },
    image: confirm,
    frames: {max: 2},
    size: {w: 240, h: 110}
})

const baseChar = new Image()
baseChar.src = '../img/characterCreate/baseChar.png'

const bowlHair = new Image()
bowlHair.src = '../img/characterCreate/bowlHair.png'
const curlyHair = new Image()
curlyHair.src = '../img/characterCreate/curlyHair.png'
const longHair = new Image()
longHair.src = '../img/characterCreate/longHair.png'
const mopHair = new Image()
mopHair.src = '../img/characterCreate/mopHair.png'
const shortHair = new Image()
shortHair.src = '../img/characterCreate/shortHair.png'
const spikeyHair = new Image()
spikeyHair.src = '../img/characterCreate/spikeyHair.png'
const baldHair = new Image()
baldHair.src = '../img/characterCreate/baldHair.png'

const hairStyles = [ bowlHair, curlyHair, longHair, mopHair, shortHair, spikeyHair, baldHair ]

const character = new Character({
    imageBase: baseChar,
    hairStyles: hairStyles,
    frames: {max: 9},
})

function changeHair(increment) {
    if( increment === -1 && character.currentHair === 0 ){
        character.currentHair = character.hairStyles.length - 1
    } else if( increment === 1 && character.currentHair === character.hairStyles.length - 1 ) {
        character.currentHair = 0
    } else {
        character.currentHair += increment
    }
}

export function characterCreate() {
    background.draw()
    leftButton.draw()
    rightButton.draw()
    confirmButton.draw()
    character.draw()
    if(text.enabled) {
        cursor.draw()
    }
    text.draw()
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function buttonCollision(mousePos, button) {
    if( 
        button.position.x < mousePos.x && 
        mousePos.x < (button.position.x + button.width) && 
        button.position.y < mousePos.y && 
        mousePos.y < (button.position.y + button.height) 
    ) { 
        return true 
    } else {
        return false 
    }
}

function confirmCharacter() {
    player.hairStyle = character.currentHair
    charCreateUI.displayUI = false
}

function selectTextbox(bool) {
    text.enabled = bool
}

window.addEventListener('click', (e) => {
    if(buttonCollision(getMousePos(canvas, e), rightButton)) { changeHair(1) } 
    if(buttonCollision(getMousePos(canvas, e), leftButton)) { changeHair(-1) } 
    if(buttonCollision(getMousePos(canvas, e), confirmButton)) { confirmCharacter() }
    if(buttonCollision(getMousePos(canvas, e), { position: {x: 680, y: 270 }, width: 550, height: 130 })) { selectTextbox(true) } else { selectTextbox(false) }
})

window.addEventListener('keydown', (e) => {
    if(text.enabled) {
        if( e.key === 'Backspace' ) { 
            text.characterImages.pop()
            text.name = text.name.substring(0, text.name.length - 1);
        } else if( acceptedChars.includes(e.key.toUpperCase()) ) {
            if( text.name.length < text.maxCharacters ) {
                text.name += e.key
                text.characterImages.push(characterImages[e.key.toLowerCase()])
            }
        console.log(text.name);
        }
    }
})
