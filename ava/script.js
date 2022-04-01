// DADOS DO JOGO
let pcMoves = []
let playerMoves = []
const startButton = document.getElementById('start').addEventListener('click', getPcMoves)
const gameStats = document.createElement('section')
gameStats.classList.add('gameStats')
document.querySelector('.container').appendChild(gameStats)

let phaseLevel = 0
const phaseLevelDisplay = document.createElement('p')
phaseLevelDisplay.innerText = `Fase: ${phaseLevel}`
phaseLevelDisplay.classList.add('levelDisplay')
gameStats.appendChild(phaseLevelDisplay)
let score = 0

const scoreDisplay = document.createElement('p')
scoreDisplay.innerText = `Pontuação: ${score}`
scoreDisplay.classList.add('scoreDisplay')
gameStats.appendChild(scoreDisplay)
let numeroSorteado = 0
let interval = 0

addEventToPads()


// Função para pegar um número aleatório de 0 a 3 e armazenar no array pcMoves
function getPcMoves() {
    playerMoves = []
    const getAnumber = Math.floor(Math.random() * 4)
    if (getAnumber === 0) {
        pcMoves.push('verde')
    }
    if (getAnumber === 1) {
        pcMoves.push('vermelho')
    }
    if (getAnumber === 2) {
        pcMoves.push('azul')
    }
    if (getAnumber === 3) {
        pcMoves.push('amarelo')
    }
    colorChoose(pcMoves)
}


function lightPads(pad, padColor) {
    pad.classList.add(`${padColor}--active`)
    setTimeout(function() {
        pad.classList.remove(`${padColor}--active`)
    }, 100)
}

function pcColorLights(pad, padColor) {
    setTimeout(() => {
        pad.classList.add(`${padColor}--active`)
    }, 1000)
    setTimeout(function() {
        pad.classList.remove(`${padColor}--active`)
    }, 2000)
}


function addEventToPads() {
    const pads = [...document.querySelectorAll('.pad')]
    pads.forEach(function(elem) {
        elem.addEventListener('click', function(e) {
            const pad = e.target
            const padColor = pad.classList[1].split('-')[2]
            playerMoves.push(padColor)
            lightPads(pad, padColor)
            waitToCheck()
        })
    })
}

function colorChoose(pcMoves) {
    let padColor = ''
    let pad = ''
    pcMoves.forEach(function(element, index, array) {
        if (array[index] === 'verde') {
            padColor = 'verde'
            pad = document.querySelector('.pad--verde')
            setTimeout(() => {
                pcColorLights(pad, padColor)
            }, 500)
        }
        if (array[index] === 'vermelho') {
            padColor = 'vermelho'
            pad = document.querySelector('.pad--vermelho')
            setTimeout(() => {
                pcColorLights(pad, padColor)
            }, 500)
        }
        if (array[index] === 'azul') {
            padColor = 'azul'
            pad = document.querySelector('.pad--azul')
            setTimeout(() => {
                pcColorLights(pad, padColor)
            }, 500)
        }
        if (array[index] === 'amarelo') {
            padColor = 'amarelo'
            pad = document.querySelector('.pad--amarelo')
            setTimeout(() => {
                pcColorLights(pad, padColor)
            }, 500)
        }


    })
}

function waitToCheck() {
    if (pcMoves.length === playerMoves.length) {
        verifyMoves(pcMoves, playerMoves)

    }
}

// function areArraysEqual(pcMoves, playerMoves) {
//     if (pcMoves.length === playerMoves.length && pcMoves.every((value, index) => value === playerMoves[index])) {
//         return true
//     } else {
//         return false
//     };
// }

//Função para pausar o jogo, verificar se o jogador acertou os movimentos e reiniciar ou continuar.
function verifyMoves(pcMoves, playerMoves) {

    if (pcMoves.toString() === playerMoves.toString()) {
        score++
        phaseLevel++
        const vitoria = document.createElement('h1')
        vitoria.innerText = 'Boa! Continue!'
        vitoria.classList.add('vitoria')
        document.querySelector('.container').appendChild(vitoria)
        setTimeout(() => {
            vitoria.remove('h1')
        }, 2000)
        scoreDisplay.innerText = `Pontuação: ${score}`
        phaseLevelDisplay.innerText = `Fase: ${phaseLevel}`
        getPcMoves()

    } else {
        const derrota = document.createElement('h1')
        derrota.innerText = 'Vish! Deu não!'
        document.querySelector('.container').appendChild(derrota)
        derrota.classList.add('derrota')
        const audioDerrota = new Audio('sounds/derrota.mp3')
        audioDerrota.play()
    }
}