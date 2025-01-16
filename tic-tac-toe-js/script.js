const symbols = {
  cross: {
    class: "Cross",
    html: '<i class="fa-solid fa-x"></i>',
  },
  circle: {
    class: "Circle",
    html: '<i class="fa-solid fa-o"></i>',
  },
};

let gameState = {
  moves: 0,
  canPlay: true,
  currentSymbol: symbols.cross,
};

const elements = {
  btnOptions: document.querySelectorAll(".button-option"),
  winMessage: document.querySelector("#message"),
  popUp: document.querySelector(".popup"),
  gameContainer: document.querySelector(".wrapper"),
  restartBtn: document.querySelector("#restart"),
  newGameBtn: document.querySelector("#new-game"),
};

function handleCellclick(btn, index) {
  if (!gameState.canPlay || isCellOccupied(btn)) {
    return;
  }

  placeSymbol(btn);
  if (checkWin(index)) {
    handleWin();
    return;
  }
  if (gameState.moves === 9) {
    console.log("hi");
    handleDraw();
    return;
  }
  switchPlayer();
}

function isCellOccupied(btn) {
  return (
    btn.classList.contains(symbols.cross.class) ||
    btn.classList.contains(symbols.circle.class)
  );
}

function placeSymbol(btn) {
  btn.innerHTML = gameState.currentSymbol.html;
  btn.classList.add(gameState.currentSymbol.class);
  gameState.moves++;
}
function checkWin(lastMove) {
  const currentClass = gameState.currentSymbol.class;

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // vertical
    [0, 4, 8],
    [2, 4, 6], // diagonal
  ];
  const relevantLines = lines.filter((line) => {
    return line.includes(lastMove);
  });

  return relevantLines.some((line) => {
    return line.every((cell) => {
      return elements.btnOptions[cell].classList.contains(currentClass);
    });
  });
}
function handleWin() {
  gameState.canPlay = false;

  setTimeout(() => {
    elements.winMessage.innerHTML = `${gameState.currentSymbol.class} Won!`;
    gameState.canPlay = true;
    toggleGameView();
  }, 1000);
}
function handleDraw() {
  gameState.canPlay = false;
  setTimeout(() => {
    toggleGameView();
    gameState.canPlay = true;
    elements.winMessage.innerHTML = "It's a Draw!";
  }, 1000);
}

function switchPlayer() {
  gameState.currentSymbol =
    gameState.currentSymbol === symbols.cross ? symbols.circle : symbols.cross;
}

function toggleGameView() {
  elements.popUp.classList.toggle("hide");
  elements.gameContainer.classList.toggle("hide");
  resetGame();
}
function resetGame() {
  elements.btnOptions.forEach((btn) => {
    btn.innerHTML = "";
    btn.classList.remove(symbols.cross.class, symbols.circle.class);
  });
  gameState = {
    moves: 0,
    canPlay: true,
    currentSymbol: symbols.cross,
  };
}
function initGame() {
  elements.btnOptions.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      handleCellclick(btn, index);
    });
  });

  elements.restartBtn.addEventListener("click", resetGame);
  elements.newGameBtn.addEventListener("click", toggleGameView);
}
document.addEventListener("DOMContentLoaded", initGame);
