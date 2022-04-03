// DADOS DO JOGO
let pcMoves = []
let playerMoves = []

const container = document.createElement('div')
container.classList.add('container')
document.querySelector('body').appendChild(container)

const geniusName = document.createElement('h1')
geniusName.classList.add('geniusName')
geniusName.innerText = 'Genius'
container.appendChild(geniusName)

const divPaiDasDivs = document.createElement('div')
divPaiDasDivs.classList.add('circuloPreto')
container.appendChild(divPaiDasDivs)


const padVerde = document.createElement('div')
padVerde.classList.add('pad--verde')

const padVermelho = document.createElement('div')
padVermelho.classList.add('pad--vermelho')

const padAzul = document.createElement('div')
padAzul.classList.add('pad--azul')

const padAmarelo = document.createElement('div')
padAmarelo.classList.add('pad--amarelo')
const pads = [padVerde, padVermelho, padAzul, padAmarelo]

const circuloCentro = document.createElement('div')
circuloCentro.classList.add('circuloCentro')
container.appendChild(circuloCentro)
const start = document.createElement('button')
start.addEventListener('click', getPcMoves)
addEventToPads()
start.classList.add('start')
start.innerText = 'Start Game'

const reset = document.createElement('button')
reset.addEventListener('click', resetGame)
reset.classList.add('reset')
reset.innerText = 'Restart Game'

circuloCentro.append(start, reset)

divPaiDasDivs.append(padVerde, padVermelho, padAzul, padAmarelo)


const gameStats = document.createElement('section')
gameStats.classList.add('gameStats')
document.querySelector('.circuloPreto').appendChild(gameStats)

let playerName = prompt("Seja bem vindo ao Genius! Digite o seu nome para começar.", "")
if (playerName === '' || playerName === null) {
    playerName = 'Zé Ninguém'
}
const playerNameDisplay = document.createElement('p')
playerNameDisplay.innerText = `Jogador:${playerName}`
playerNameDisplay.classList.add('nameDisplay')
gameStats.appendChild(playerNameDisplay)


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

// Função para pegar um número aleatório de 0 a 3 e armazenar no array pcMoves
function getPcMoves() {
    waitToPlay()

    playerMoves = []
    const getAnumber = Math.floor(Math.random() * 4)
    if (getAnumber === 0) {
        pcMoves.push('verde')
    } else if (getAnumber === 1) {
        pcMoves.push('vermelho')
    } else if (getAnumber === 2) {
        pcMoves.push('azul')
    } else if (getAnumber === 3) {
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
        const padAudio = new Audio('sounds/padSound2.wav')
        padAudio.play()
    }, 1000)

    setTimeout(function() {
        pad.classList.remove(`${padColor}--active`)
    }, 1500)

}

function addEventToPads() {
    pads.forEach(function(elem, index) {
        elem.addEventListener('click', function(e) {
            const pad = e.target
            const padColor = pad.classList[0].split('-')[2]
            playerMoves.push(padColor)
            lightPads(pad, padColor)
            waitToCheck()
        })
    })
}

let counter = 0

function colorChoose(pcMoves) {
    let padColor = ''
    let pad = ''
    counter = 0
    for (let index = 0; index <= pcMoves.length; index++) {
        counter += 1000

        const intervalBetweenColors = setTimeout(() => {
            if (pcMoves[index] === 'verde') {
                padColor = 'verde'
                pad = document.querySelector('.pad--verde')
                pcColorLights(pad, padColor)

            } else if (pcMoves[index] === 'vermelho') {
                padColor = 'vermelho'
                pad = document.querySelector('.pad--vermelho')
                pcColorLights(pad, padColor)

            } else if (pcMoves[index] === 'azul') {
                padColor = 'azul'
                pad = document.querySelector('.pad--azul')
                pcColorLights(pad, padColor)

            } else if (pcMoves[index] === 'amarelo') {
                padColor = 'amarelo'
                pad = document.querySelector('.pad--amarelo')
                pcColorLights(pad, padColor)
            }
        }, counter)
        setTimeout(() => {
            clearInterval(intervalBetweenColors)
        }, counter + 500)
    }
    setTimeout(() => {
        playerTurn()
    }, counter + 1000)

}

function waitToCheck() {
    if (pcMoves.length === playerMoves.length) {
        verifyMoves(pcMoves, playerMoves)
    }
}

//Função para pausar o jogo, verificar se o jogador acertou os movimentos e reiniciar ou continuar.
function verifyMoves(pcMoves, playerMoves) {

    if (pcMoves.toString() === playerMoves.toString()) {
        score++
        phaseLevel++
        const vitoria = document.createElement('h1')
        vitoria.innerText = 'Boa! Continue!'
        vitoria.classList.add('vitoria')
        document.querySelector('body').appendChild(vitoria)
        setTimeout(() => {
            vitoria.remove('h1')
        }, 1000)
        scoreDisplay.innerText = `Pontuação: ${score}`
        phaseLevelDisplay.innerText = `Fase: ${phaseLevel}`
        getPcMoves()

    } else {
        const derrota = document.createElement('h1')
        derrota.innerText = `Não foi dessa vez. Sua pontuação foi: ${score}. Tente novamente!`
        document.querySelector('body').appendChild(derrota)
        derrota.classList.add('derrota')
        const audioDerrota = new Audio('sounds/derrota.mp3')
        audioDerrota.play()
    }
}

function resetGame() {
    const audioRestart = new Audio('sounds/restart.mp3')
    audioRestart.play()
    playerMoves = []
    pcMoves = []
    phaseLevel = 0
    score = 0
    document.querySelector('.derrota').remove('h1')
    getPcMoves()
}

function waitToPlay() {
    setTimeout(() => {
        const waitToPlayText = document.createElement('p')
        waitToPlayText.innerText = 'Preste atenção na sequência!'
        waitToPlayText.classList.add('payAtention')
        divPaiDasDivs.appendChild(waitToPlayText)
        setTimeout(() => {
            waitToPlayText.innerText = ''
        }, 1000)
    }, 1500)



}

function playerTurn() {
    const playerTurnText = document.createElement('p')
    playerTurnText.classList.add('playerTurn')
    playerTurnText.innerText = 'Sua vez!'
    divPaiDasDivs.appendChild(playerTurnText)

    setTimeout(() => {
        playerTurnText.innerText = ''
    }, 500)

}
