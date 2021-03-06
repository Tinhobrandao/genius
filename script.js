// DADOS DO JOGO
const pcMoves = []
const playerMoves = []
const startButton = document.getElementById('start').addEventListener('click', pcMovement)
let phaseLevel = 0
let score = 0
let numeroSorteado = 0

let interval = 0
    // Função para pegar um número aleatório de 0 a 3 e armazenar no array pcMoves
function pcMovement() {
    interval = setInterval(() => {
        for (let index = 0; index <= phaseLevel; index++) {
            numeroSorteado = (Math.floor(Math.random() * 4))
            pcMoves.push(numeroSorteado)
            colorChoose(pcMoves) // Aqui é chamada a função para escolher a cor que será acesa
        }
    }, 3000)
}



// Função para acender a cor que o PC escolher
function colorChoose(pcMoves) {

    // const sounds = document.querySelectorAll('audio')
    for (let index = 0; index <= pcMoves.length; index++) {
        if (pcMoves[index] === 0) {
            greenOne.classList.toggle('verde--active')
                // sounds[index].play()

        } else if (pcMoves[index] === 1) {
            redOne.classList.toggle('vermelho--active')
                // sounds[index].play()

        } else if (pcMoves[index] === 2) {
            blueOne.classList.toggle('azul--active')
                // sounds[index].play()

        } else if (pcMoves[index] === 3) {
            yellowOne.classList.toggle('amarelo--active')
                // sounds[index].play()
        }
        cleanColors()
    }
}

function cleanColors() {
    setTimeout(() => {
        greenOne.classList.remove('verde--active')
        redOne.classList.remove('vermelho--active')
        blueOne.classList.remove('azul--active')
        yellowOne.classList.remove('amarelo--active')
    }, 1000)
    if (pcMoves.length == playerMoves.length) {
        verifyMoves(pcMoves, playerMoves)
    }
}




//  EventLinsteners das Cores p/ gravar o click e armazenar onde foi no array playersMoves
const greenOne = document.querySelector('.verde')
greenOne.addEventListener('click', event => {
    playerMoves.push(0)
})

const redOne = document.querySelector('.vermelho')
redOne.addEventListener('click', event => {
    playerMoves.push(1)
})

const blueOne = document.querySelector('.azul')
blueOne.addEventListener('click', event => {
    playerMoves.push(2)
})

const yellowOne = document.querySelector('.amarelo')
yellowOne.addEventListener('click', event => {
    playerMoves.push(3)
})



// function setarTimeout(function) {


// }
// function verificaCliques() {
//     //verificar se o clique(índice) é igual ao movimento do pc
// }

//Função para pausar o jogo, verificar se o jogador acertou os movimentos e reiniciar ou continuar.
function verifyMoves(pcMoves, playerMoves) {
    setTimeout(() => {
        for (let index = 0; index <= pcMoves.length; index++) {
            if (pcMoves === playerMoves) {
                score++
                phaseLevel++
                pcMovement(phaseLevel)
                const vitoria = document.createElement('h1').innerText('Boa! Continue!')
                document.querySelector('h1').appendChild(vitoria)

            } else if (pcMoves[index] !== playerMoves[index]) {
                const derrota = document.createElement('h1').innerText('Você perdeu!')
                document.querySelector('h1').appendChild(derrota)

                clearInterval(interval)

            }
        }
    }, 3000)
}
