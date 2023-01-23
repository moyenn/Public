const boxes = Array.from(document.getElementsByClassName("box")); // array of boxes

const playText = document.getElementById("playText");
const restartBtn = document.getElementById("restartBtn");

const spaces = [];
const O_TEXT = "O";
const X_TEXT = "X";

// manually determine if a player has won
const playerHasWon = () => {
    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} wins up top.`);
            return true;
        }

        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins on the left.`);
            return true;
        }

        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally.`);
            return true;
        }
    }

    if (spaces[8] === currentPlayer) {
        if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins on the right.`);
            return true;
        }

        if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins on the bottom.`);
            return true;
        }
    }

    if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins in the middle (vertically).`);
            return true;
        }

        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins in the middle (horizontally).`);
            return true;
        }

        if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally.`);
            return true;
        }
    }

};

// checks all spaces and returns true if they are all filled by a player
const noSpacesLeft = () => {
    for (let i = 0; i <= 8; i++) {
        if (spaces[i] == null)  {
            return false;
        }
    }
    
    return true;
}

// restarts the game
const restart = () => {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    })
    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove("o-color");
        box.classList.remove("x-color");
    })

    playText.innerText = "Tuq Tac Toe!";
    currentPlayer = O_TEXT;
};


restartBtn.addEventListener("click", restart)

// when a square is clicked, place an x/o and evaluate the game state
const boxClicked = (event) => {
    const id = event.target.id; // get button number

    if (!spaces[id]) {
        if (playerHasWon()) {
            event.target.classList.add(currentPlayer === O_TEXT ? "o-color" : "x-color")
            playText.innerText = `${currentPlayer} wins!`;
            return;
        } else {
            event.target.classList.add(currentPlayer === O_TEXT ? "o-color" : "x-color")
            spaces[id] = currentPlayer;
            event.target.innerText = currentPlayer; // event.target IS the box

            if (playerHasWon()) {
                playText.innerText = `${currentPlayer} wins!`;
                return;

            } else if (noSpacesLeft()) {
                playText.innerText = "Draw!"
            } else {
                currentPlayer = (currentPlayer === O_TEXT) ? X_TEXT : O_TEXT; 
            }
        }
    }
};

// draw the tic tac toe board
const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if (index < 3) { // box is on the top
            styleString += "border-bottom: 3px solid var(--mainClr);";
        }

        if (index % 3 === 0)  { // is cleanly divisible by 3, therefore its on the left side
            styleString += "border-right: 3px solid var(--mainClr);";
        }

        if (index % 3 === 2) { // is on the right hand side
            styleString += "border-left: 3px solid var(--mainClr);"; 
        }

        if (index > 5) { // is on the bottom
            styleString += "border-top: 3px solid var(--mainClr);";
        }
        box.style = styleString;
        box.addEventListener("click", boxClicked);
    })
};

// set up the board at the start
restart();
drawBoard();