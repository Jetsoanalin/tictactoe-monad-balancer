let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handlePlayerTurn(clickedCellIndex) {
  if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  gameBoard[clickedCellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace("cell-", "")) - 1;
  if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  handlePlayerTurn(clickedCellIndex);
  updateUI();
}

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", cellClicked, false);
});

function updateUI() {
  cells.forEach((cell, i) => {
    cell.className = "cell"; // Reset the class to default 'cell'

    if (gameBoard[i] === "X" || gameBoard[i] === "O") {
      cell.classList.add(gameBoard[i]);
    }
  });
}

function announceWinner(player) {
  const messageElement = document.getElementById("gameMessage");
  if (player == "X") {
    messageElement.innerText = `BALANCER Team Wins!`;
    Swal.fire({
      title: 'Balancer Team Won this time!',
      text: 'Forget it guys support Balancer X Monad Partnership and lets enjoy with a sip of beer🍻 !',
      // background: "#7066e0",
      imageUrl: 'https://i.ibb.co/s1vCcCV/Monad35.png',
      imageAlt: 'Custom image',
      // confirmButtonColor: "#fff",
      color: "#545454",
    })
  } else {
    messageElement.innerText = `MONAD Team Wins!`;
    Swal.fire({
      title: 'Monadians are always a winner!',
      text: 'Forget it guys support Balancer X Monad Partnership and lets enjoy with a sip of beer🍻 !',
      // background: "#7066e0",
      imageUrl: 'https://i.ibb.co/zHZ5h4y/Monad13.png',
      imageAlt: 'Custom image',
      // confirmButtonColor: "#fff",
      color: "#545454",
    })
  }
}
function announceDraw() {
  const messageElement = document.getElementById("gameMessage");
  messageElement.innerText = "Game Draw!";
  Swal.fire({
    title: 'Oh look we both are winners!',
    text: 'Support Balancer X Monad Partnership and lets enjoy with a sip of beer🍻 !',
    // background: "#7066e0",
    imageUrl: 'https://i.ibb.co/cJGB1K7/Monad8.png',
    imageAlt: 'Custom image',
    // confirmButtonColor: "#fff",
    color: "#545454",
  })
}

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announceWinner(currentPlayer);
    gameActive = false;
    return;
  }

  let roundDraw = !gameBoard.includes("");
  if (roundDraw) {
    announceDraw();
    gameActive = false;
    return;
  }
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.className = "cell";
  });
  document.getElementById("gameMessage").innerText = "";
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame, false);

Swal.fire({
  title: 'Welcome to Monad X Balancer War!',
  text: 'Supporters of Monadians and Balancers Lets join this Tic Tac Toe war and lets see which community team takes the winning cup home !',
  // background: "#7066e0",
  imageUrl: 'https://i.ibb.co/zsg4bKN/monad.webp',
  imageAlt: 'Custom image',
  // confirmButtonColor: "#fff",
  color: "#545454",
})