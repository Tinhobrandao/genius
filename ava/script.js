// DADOS DO JOGO
const pcMoves = []
const playerMoves = []
const startButton = document.getElementById('start').addEventListener('click', getPcMoves)
const gameStats = document.createElement('section')
gameStats.classList.add('gameStats')
document.querySelector('.container').appendChild(gameStats)

const phaseLevel = 1
const phaseLevelDisplay = document.createElement('p')
phaseLevelDisplay.classList.add('levelDisplay')
phaseLevelDisplay.innerText = `Fase: ${phaseLevel}`
gameStats.appendChild(phaseLevelDisplay)
let score = 0
const scoreDisplay = document.createElement('p')
scoreDisplay.classList.add('scoreDisplay')
scoreDisplay.innerText = `Pontuação: ${score}`
gameStats.appendChild(scoreDisplay)
let numeroSorteado = 0
let interval = 0


//  EventLinsteners das Cores p/ gravar o click e armazenar onde foi no array playersMoves

const greenOne = document.querySelector('.verde')
const redOne = document.querySelector('.vermelho')
const blueOne = document.querySelector('.azul')
const yellowOne = document.querySelector('.amarelo')

greenOne.addEventListener('click', event => {
    playerMoves.push(0)
    waitToCheck()
})

redOne.addEventListener('click', event => {
    playerMoves.push(1)
    waitToCheck()
})

blueOne.addEventListener('click', event => {
    playerMoves.push(2)
    waitToCheck()
})

yellowOne.addEventListener('click', event => {
    playerMoves.push(3)
    waitToCheck()
})


// Função para pegar um número aleatório de 0 a 3 e armazenar no array pcMoves
function getPcMoves() {
    const getAnumber = Math.floor(Math.random() * 4)
    pcMoves.push(getAnumber)
    colorChoose(getAnumber)
}



function waitToCheck() {
    if (pcMoves.length !== playerMoves.length) {
        null
    } else {
        verifyMoves(pcMoves, playerMoves)
    }
}


// Função para acender a cor que o PC escolher
function colorChoose(getPcMoves) {

    // const sounds = document.querySelectorAll('audio')
    pcMoves.forEach((elemen, index, array) => {
        setTimeout(() => {
            if (array[index] === 0) {
                greenOne.classList.toggle('verde--active')
                    // sounds[index].play()
            }
        }, 1000)

        setTimeout(() => {
            if (array[index] === 1) {
                redOne.classList.toggle('vermelho--active')
                    // sounds[index].play()
            }
        }, 2000)

        setTimeout(() => {
            if (array[index] === 2) {
                blueOne.classList.toggle('azul--active')
                    // sounds[index].play()
            }
        }, 3000)

        setTimeout(() => {
            if (array[index] === 3) {
                yellowOne.classList.toggle('amarelo--active')
                    // sounds[index].play()
            }
        }, 4000)

        cleanColors()
    })
}

function cleanColors() {
    setTimeout(() => {
        greenOne.classList.remove('verde--active')

    }, 1500)
    setTimeout(() => {
        redOne.classList.remove('vermelho--active')

    }, 2500)
    setTimeout(() => {
        blueOne.classList.remove('azul--active')

    }, 3500)
    setTimeout(() => {
        yellowOne.classList.remove('amarelo--active')

    }, 4500)


}

//Função para pausar o jogo, verificar se o jogador acertou os movimentos e reiniciar ou continuar.
function verifyMoves() {
    if (pcMoves === playerMoves) {
        score++
        phaseLevel++
        const vitoria = document.createElement('h1')
        vitoria.innerText = 'Boa! Continue!'
        vitoria.classList.add('vitoria')
        document.querySelector('.container').appendChild(vitoria)
        getPcMoves()

    } else {
        const derrota = document.createElement('h1')
        derrota.innerText = 'Vish! Deu não!'
        document.querySelector('.container').appendChild(derrota)
        derrota.classList.add('derrota')
        const audioDerrota = new Audio('sounds/derrota.mp3')
        audioDerrota.play()


    }

    console.log(pcMoves)
    console.log(playerMoves)
}