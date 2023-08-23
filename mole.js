let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let playerRanking = [];
window.onload = function () {
  setGame();
}

function setGame() {
  //set up the grid in html
  for (let i = 0; i < 36; i++) { // 6x6 grid, total 36 tiles
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  setInterval(setMole, 1000); // Increase frequency to every 0.5 seconds
  setInterval(setPlant, 2000);
}

function getRandomTile() {
  //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
  let num = Math.floor(Math.random() * 9);
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
  mole.src = "./monty-mole.png";

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
  plant.src = "./piranha-plant.png";

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

    // Update player ranking
    let playerName = prompt("Enter your name:");
    if (playerName) {
      playerRanking.push({ name: playerName, score: score });
      playerRanking.sort((a, b) => b.score - a.score); // Sort in descending order
      updateRanking();
    }
  }
  // if (this == currMoleTile) {
  //     score += 10;
  //     document.getElementById("score").innerText = score.toString(); //update score html
  // }
  // else if (this == currPlantTile) {
  //     document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
  //     gameOver = true;
  // }
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