const boxes = document.querySelectorAll(".box");
let turn = "X";
let player = 1;
const sound = new Audio("C:\Users\Basel\Downloads\swing-whoosh-110410.mp3");
const winConditions = [  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

boxes.forEach(box => {
  box.addEventListener("click", handleClick);
});

function handleClick(event) {
  const box = event.target;
  if (box.innerHTML !== "") return;
  box.innerHTML = turn;
  box.classList.add(turn.toLowerCase());
  document.getElementById("soundEffect").play();
  checkForWin();
  checkForDraw();
  turn = turn === "X" ? "O" : "X";
  player = player === 1 ? 2 : 1;
}

function checkForWin() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      boxes[a].innerHTML === turn &&
      boxes[b].innerHTML === turn &&
      boxes[c].innerHTML === turn
    ) {
      boxes[a].classList.add("winner");
      boxes[b].classList.add("winner");
      boxes[c].classList.add("winner");
      showWinMessage(player);
      return;
    }
  }
}

function checkForDraw() {
  let draw = true;
  boxes.forEach(box => {
    if (box.innerHTML === "") {
      draw = false;
    }
  });
  if (draw) {
    showDrawMessage();
  }
}

function showWinMessage(winner) {
  setTimeout(() => {
    alert(`Player ${winner} wins!`);
    resetGame();
  }, 500);
}

function showDrawMessage() {
  setTimeout(() => {
    alert("It's a draw!");
    resetGame();
  }, 500);
}

function resetGame() {
  boxes.forEach(box => {
    box.innerHTML = "";
    box.classList.remove("x", "o", "winner");
  });
  turn = "X";
  player = 1;
}
