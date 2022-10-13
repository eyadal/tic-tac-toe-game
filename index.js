const boxes = document.querySelectorAll('.box')
const statusText = document.querySelector('#statusText')
const restartBtn = document.querySelector('#restartBtn')
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
let options = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
let gameOver = false

initializeGame()
function initializeGame() {
  boxes.forEach((box) => box.addEventListener('click', boxClicked))
  restartBtn.addEventListener('click', restartGame)

  statusText.textContent = `${currentPlayer}'s turn`
  gameOver = true
}

function boxClicked() {
  const boxIndex = this.getAttribute('boxIndex')

  if (options[boxIndex != '' || !gameOver]) {
    return
  }
  updateBox(this, boxIndex)
  checkWinner()
}

function updateBox(box, index) {
  options[index] = currentPlayer
  box.textContent = currentPlayer
}

function changePlayer() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X'
  statusText.textContent = `${currentPlayer}'s turn`
}
function checkWinner() {
  let winner = false

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i]
    const boxA = options[condition[0]]
    const boxB = options[condition[1]]
    const boxC = options[condition[2]]

    if (boxA == '' || boxB == '' || boxC == '') {
      continue
    } else if (boxA == boxB && boxB == boxC) {
      winner = true
      break
    }
  }
  if (winner) {
    statusText.textContent = `${currentPlayer} wins!`
    gameOver = false
  } else if (!options.includes('')) {
    statusText.textContent = 'Draw'
    gameOver = false
  } else {
    changePlayer()
  }
}
function restartGame() {
  currentPlayer = 'X'
  options = ['', '', '', '', '', '', '', '', '']
  statusText.textContent = `${currentPlayer}'s turn`
  boxes.forEach((box) => (box.textContent = ''))
  gameOver = true
}
