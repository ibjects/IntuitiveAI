let grid;
let gameEnded = false;
let score = 0;

function setupGrid() {
  let numbers = [...Array(16).keys()];
  shuffle(numbers);

  // Initialize grid with '❎'
  let grid = new Array(16).fill("❎");

  // Assign elements
  let indexOfGold = numbers.indexOf(7);
  let indexOfMonster = numbers.indexOf(11);
  let indexOfPits = [
    numbers.indexOf(0),
    numbers.indexOf(5),
    numbers.indexOf(9),
    numbers.indexOf(15),
  ];

  // Find adjacent indices for each element
  function findAdjacent(index) {
    let adjacent = [];
    if (index + 4 < 16) adjacent.push(index + 4);
    if (index - 4 >= 0) adjacent.push(index - 4);
    if (index % 4 != 3 && index + 1 < 16) adjacent.push(index + 1);
    if (index % 4 != 0 && index - 1 >= 0) adjacent.push(index - 1);
    return adjacent;
  }

  // Determine hints for each grid position
  indexOfPits.forEach((pitIndex) => {
    findAdjacent(pitIndex).forEach((adjIndex) => {
      if (!grid[adjIndex].includes("💨"))
        grid[adjIndex] = grid[adjIndex].replace("❎", "") + "💨";
    });
  });

  [indexOfMonster, indexOfGold].forEach((elemIndex) => {
    let hintSymbol = elemIndex === indexOfMonster ? "👃" : "✨";
    findAdjacent(elemIndex).forEach((adjIndex) => {
      if (grid[adjIndex] === "❎" || !grid[adjIndex].includes(hintSymbol)) {
        grid[adjIndex] = grid[adjIndex].replace("❎", "") + hintSymbol;
      }
    });
  });

  // Place elements
  grid[indexOfMonster] = "👹";
  grid[indexOfGold] = "💰";
  indexOfPits.forEach((pitIndex) => {
    grid[pitIndex] = "🕳️";
  });
  console.log("grid: ", grid);
  return grid;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createGrid() {
  grid = setupGrid();
  const gridContainer = document.getElementById("grid");

  let hintIndices = [];
  grid.forEach((item, index) => {
    if (item !== "👹" && item !== "💰" && item !== "🕳️" && item !== "❎") {
      hintIndices.push(index);
    }
  });

  // Randomly select a hint index to reveal
  let randomHintIndex =
    hintIndices[Math.floor(Math.random() * hintIndices.length)];

  grid.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.className = "grid-item";
    if (index === randomHintIndex) {
      cell.innerHTML = item; // Reveal the hint
      cell.classList.add("clicked");
    }
    cell.onclick = () => onBoxClick(cell, item);
    gridContainer.appendChild(cell);
  });
}

function checkGameOutcome(cell, item) {
  if (item === "🕳️") {
    score -= 1; // Subtract 1 from the current score
    endGame(cell, "Game Over: You fell into a pit!");
  } else if (item === "💰") {
    foundGold = true;
    score += 1; // Add 1 point for finding Gold
    alert("You found Gold! Keep searching for the Monster.");
  } else if (item === "👹") {
    score += 1; // Add 1 more point for finding the Monster
    endGame(cell, "Congratulations: You found the Monster!");
  }
  updateScoreDisplay();
}

function endGame(cell, message) {
  gameEnded = true;
  cell.classList.add("game-ending");
  revealEntireGrid();
  setTimeout(() => {
    alert(message + " Your total score now is: " + score);
    restartGame();
  }, 100);
}

function onBoxClick(cell, item) {
  if (gameEnded) return; // Prevent clicks after game end
  cell.classList.add("clicked"); // Highlight the clicked cell
  cell.innerHTML = item;
  checkGameOutcome(cell, item);
}

function revealEntireGrid() {
  const cells = document.getElementsByClassName("grid-item");
  for (let cell of cells) {
    const index = Array.prototype.indexOf.call(cells, cell);
    cell.innerHTML = grid[index];
    cell.classList.add("revealed");
  }
}

function restartGame() {
  gameEnded = false;
  foundGold = false;
  document.getElementById("grid").innerHTML = "";
  createGrid();
}

function updateScoreDisplay() {
  document.getElementById("score").textContent = `Score this session: ${score}`;
}

document.addEventListener("DOMContentLoaded", createGrid);
document.getElementById("newGameButton").addEventListener("click", restartGame);
