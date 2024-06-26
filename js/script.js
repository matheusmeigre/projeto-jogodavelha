// Initial Data
let music = document.getElementById("background-music");
let toggleButton = document.getElementById("toggle-sound");

document.getElementById("gameArea").style.display = "none"
document.getElementById("toggle-sound").style.display = "none"

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;

    // Aqui você pode adicionar a lógica de identificação, por exemplo, verificar se o nome de usuário existe em um banco de dados
    // Se o nome de usuário existir, exiba o jogo, caso contrário, exiba uma mensagem de erro
    if (username.trim() !== "") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("gameArea").style.display = "grid";
        document.getElementById("toggle-sound").style.display = "block"
    } else {
        document.getElementById("login-message").innerText = "Por favor, insira um nome de usuário.";
    }

    music.play()
});

toggleButton.addEventListener("click", function() {
    if (music.paused) {
        music.play();
        toggleButton.textContent = "Mute";
    } else {
        music.pause();
        toggleButton.textContent = "Unmute";
    }
});

let frame =  {
    a1:'', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let playerTurn = ''
let warning = ''
let playing = false

reset()

// Events
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})

// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item')
    if(playing && frame[item] === '') {
        frame[item] = playerTurn
        renderFrame()
        togglePlayer()
    }
}

function reset() {
    warning =  ''

    let random = Math.floor(Math.random() * 2)
    playerTurn = (random === 0) ? 'x' : 'o'

    for(let i in frame) {
        frame[i] = ''
    }

    playing = true

    renderFrame()
    renderInfo()
}

function renderFrame() {
    for(let i in frame) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = frame[i]
    }

    checkGame()
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = playerTurn
    document.querySelector('.resultado').innerHTML = warning
}

function togglePlayer() {
    playerTurn = (playerTurn === 'x') ? 'o' : 'x'
    renderInfo()
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu'
        playing = false
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu'
        playing = false
    } else if(isFull()) {
        warning = 'Deu empate'
        playing = false
    }
}

function checkWinnerFor(playerTurn) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let w in pos) {
        let pArray = pos[w].split(',') // a1, a2, a3
        let hasWon = pArray.every(option => frame[option] === playerTurn)
        if(hasWon) {
            return true
        }
    }

    return false
}

function isFull() {
    for(let i in frame) {
        if(frame[i] === '') {
            return false
        }
    }

    return true
}