// I am commenting all the flows so that which lines of JS codes are executing first and which are last.

// 1.Will be executing first:_:_:_JS will take all the selectors.

const cells = document.querySelectorAll(".cell"); /* In the Cells data is stored in the same way as it in in array,
 but it is not an Array. It is a NODELIST:-(a special collection, similar to array but NOT exactly an array) 
 // Before spreading:
cells = NodeList(9) [div, div, div, ...]
// Type: NodeList (not a true array)

// After spreading:
[...cells] = [div, div, div, ...]
// Type: Array (true array)


 */
const resetBtn = document.querySelector(".Reset-Button");
const message = document.querySelector(".message");


// 2. Then Set game initially to start

let currentPlayer = "X"; /* The Game will start from the X, i.e if the first mark that will be marked is "X " and not "O" in TICTACTOE */
let gameActive = true; /* Initially the game will be kept as started i.e the game is started, 
otherwise there are conditions ehn it can be stooped instantly i.e when either "X" or "O" wins or it is a "DRAW"
 */


const WIN_SETS = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]           
];

// Handle cell click.....i.e first it should had a info about in which cell the user has clicked.
// So below is the function that says in whcih cell the user had clicked.
function handleCellClick(banana){
  const cell = banana.target; 
  if (!gameActive) return;
  if (cell.textContent !== "") return; // ignore already filled cells

  // When a player clicks on the block it gets clicked the first. And in the beginning "X" is marked.
  cell.textContent = currentPlayer;

  // Check winner, as of now user has clicked on the first cell till now.
  if (checkWinner()){
    message.textContent = `${currentPlayer} wins! ....Yeaah Boy😎`;
    gameActive = false;

    setTimeout(() => {
      cells.forEach(cell => cell.textContent = "");
      currentPlayer = "X";
      gameActive = true;
      message.textContent = "Turn: X";
      
    },1500);
    
      return;
  }
    
    

    
  

  // Check draw
  if ([...cells].every(c => c.textContent !== "")){
    message.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Turn: ${currentPlayer}`;
}

// Winner check
function checkWinner(){
  return WIN_SETS.some(([a,b,c]) =>
    cells[a].textContent === currentPlayer &&
    cells[b].textContent === currentPlayer &&
    cells[c].textContent === currentPlayer
  );
}

// Reset game
resetBtn.addEventListener("click", () => {
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  message.textContent = "Turn: X";
});

// Attach listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

// Initial message
message.textContent = "Turn: X";