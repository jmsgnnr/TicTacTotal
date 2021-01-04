'use strict'
//source tutorial https://www.youtube.com/watch?v=P2TcQ3h0ipQ
// make sure to switch to new JQ functions
// remember syntax ! 
const gameRunFormula = function (){
    const statusDisplay = document.querySelector('.game--status');
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
    
    
    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    
    
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
    
    
    
    statusDisplay.innerHTML = currentPlayerTurn();
    // used to shorten original "if" statements 
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }
    
    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
    }
    
    function handleResultValidation() {
        let roundWon = false;
        // 7 or 8?
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    
        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }
    
        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }
    
        handlePlayerChange();
    }
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
    
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }
    
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    }

}


module.exports = {
    gameRunFormula
}








// curl --include --request GET "https://library-express-api.herokuapp.com/books/${ID}"

// original formula testing 

// const winningNumbas = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 6, 3],
//   [1, 4, 7],
//   [2, 8, 5],
//   [0, 4, 8],
//   [4, 2, 6]
// ];

// const howdyPartner = function (){
//   let winnerChicken = store.game.over
//   for (i= 0; i <= 8; i++){
//   console.log('yooooo')
//   }
// }





