let currZombieTile;
let currPlayerTile;
let score = 0;
let gameOver = false;
let playerName = "";
let playerRanking = [];
let speedLevel = 1; // Default speed level

function startGame() {
  playerName = prompt("Enter your name:");
  if (playerName) {
    resetGame();
  }
}

window.onload = function () {
  startGame();
};

function resetGame() {
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = "Score: 0";

  // Clear the game board
  let board = document.getElementById("board");
  board.innerHTML = "";

  // Create new tiles
  for (let i = 0; i < 16; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    board.appendChild(tile);
  }

  // Start the intervals with the selected speed level
  setInterval(setZombie, getSpeedInterval());
  setInterval(setPlayer, getSpeedInterval());
}

function getRandomTile() {
  return Math.floor(Math.random() * 16).toString();
}

function setZombie() {
  if (gameOver) {
    return;
  }
  if (currZombieTile) {
    currZombieTile.innerHTML = "";
  }
  let zombie = document.createElement("img");
  zombie.src = "./images/points.png";

  let num = getRandomTile();
  if (currPlayerTile && currPlayerTile.id == num) {
    return;
  }
  currZombieTile = document.getElementById(num);
  currZombieTile.appendChild(zombie);
}

function setPlayer() {
  if (gameOver) {
    return;
  }
  if (currPlayerTile) {
    currPlayerTile.innerHTML = "";
  }
  let player = document.createElement("img");
  player.src = "./images/gameover.png";

  let num = getRandomTile();
  if (currZombieTile && currZombieTile.id == num) {
    return;
  }
  currPlayerTile = document.getElementById(num);
  currPlayerTile.appendChild(player);
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currZombieTile) {
    score += 10;
    document.getElementById("score").innerText = "Score: " + score.toString();
  } else if (this == currPlayerTile) {
    gameOver = true;
    playerRanking.push({ name: playerName, score: score });
    playerRanking.sort((a, b) => b.score - a.score);
    updateRanking();
    document.getElementById("score").innerText = "GAME OVER: " + score.toString();
    setTimeout(startGame, 2000); // Restart the game after 2 seconds
  }
}

function updateRanking() {
  let playerList = document.getElementById("playerList");
  playerList.innerHTML = "";

  playerRanking.forEach((player, index) => {
    let listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${player.name}: ${player.score}`;
    playerList.appendChild(listItem);
  });
}

function getSpeedInterval() {
  // Adjust the speed intervals based on the selected speed level
  switch (speedLevel) {
    case 1:
      return 800;
    case 2:
      return 600;
    case 3:
      return 400;
    default:
      return 800; // Default to level 1 if an invalid level is selected
  }
}

function changeSpeed() {
  // Change the speed level when the user selects a different option
  speedLevel = parseInt(document.getElementById("speedLevel").value);
  resetGame(); // Restart the game with the new speed level
}
