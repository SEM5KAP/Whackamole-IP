let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let playerName = "";
let playerRanking = [];

function startGame() {
  playerName = prompt("Enter your name:");
  if (playerName) {
    setGame();
  }
}

window.onload = function () {
  startGame();
};

function setGame() {
  for (let i = 0; i < 16; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  setInterval(setMole, 800);
  setInterval(setPlant, 800);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 16);
  return num.toString();
}

function setMole() {
  if (gameOver) {
    return;
  }
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "./images/points.png"; //Zombie

  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) {
    return;
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "./images/gameover.png";//Girl

  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currMoleTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
  }
  else if (this == currPlantTile) {
    gameOver = true;
    playerRanking.push({ name: playerName, score: score });
    playerRanking.sort((a, b) => b.score - a.score);
    updateRanking();
    document.getElementById("score").innerText = "GAME OVER: " + score.toString();
  }
}

function updateRanking() {
  let playerList = document.getElementById("playerList");
  playerList.innerHTML = ""; // Clear previous ranking

  playerRanking.forEach((player, index) => {
    let listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${player.name}: ${player.score}`;
    playerList.appendChild(listItem);
  });
}
