document.addEventListener("DOMContentLoaded", () => {
    const boardDiv = document.querySelector(".board");
    
    const emptyCell = "-";
    const x = "X";
    const o = "O";

    // Gameboard object
    function GameBoard() {
        const board = Array(9).fill(emptyCell);

        const setLetter = (place, letter) => board[place] = letter;
        const clearBoard = () => { for (let i = 0; i < board.length; i++) board[i] = emptyCell };

        const updateBoard = () => {
            const cells = boardDiv.children;
            for (let i = 0; i < board.length; i++) {
                cells[i].innerHTML = `${board[i]}`;
            }
        };

        const checkWinner = () => {
            let first, second, third;

            // Check horizontal
            for (let i = 0; i < board.length; i += 3) {
                first = board[i];
                second = board[i + 1];
                third = board[i + 2];

                if (first === emptyCell) continue;

                if (first === second && second === third) {
                    return first;
                }
            }

            // Check vertical
            for (let i = 0; i < board.length; i += 3) {
                first = board[i];
                second = board[i + 3];
                third = board[i + 6];

                if (first === emptyCell) continue;

                if (first === second && second === third) {
                    return first;
                }
            }

            // Check diagonal
            if (board[0] === board[4] && board[4] === board[8]) return board[0];
            if (board[2] === board[4] && board[4] === board[6]) return board[2];

            return emptyCell;
        };

        const createBoard = () => {
            for (let i = 0; i < board.length; i++) {
                const boardCell = document.createElement("button");
                boardCell.className = "cell";
                boardCell.dataset.index = i;
                boardDiv.appendChild(boardCell);
            }
        };

        return { board, setLetter, clearBoard, updateBoard, checkWinner, createBoard };
    };

    // Players object
    function Player(playerLetter) {
        let playerName = playerLetter;
        return { playerLetter, playerName };
    }

    // Game object
    function Game(gameBoard) {
        const player1 = Player(x);
        const player2 = Player(o);
        let currentPlayer = player1;
        let numeroJugada = 0;

        const startGame = () => {
            gameBoard.createBoard();
            gameBoard.updateBoard();

            gameBoard.board.forEach((_, index) => {
                const cell = document.querySelector(`[data-index="${index}"]`);
                cell.addEventListener("click", handleClick);
            });

            const restartButton = document.createElement("button");
            restartButton.classList = "restart";
            restartButton.innerText = "Restart Game";
            restartButton.style.display = "none";
            restartButton.addEventListener("click", restartGameButton);

            const data = document.querySelector(".data");
            data.appendChild(restartButton);
        };

        const restartGame = () => {
            const restartButton = document.querySelector(".restart");
            restartButton.style.display = "block";
            const displayTurnP = document.querySelector("#display-turn");
            displayTurnP.style.display = "none";
        }

        const restartGameButton = () => {
            numeroJugada = 0;

            const restartButton = document.querySelector(".restart");
            restartButton.style.display = "none";

            gameBoard.clearBoard();
            gameBoard.updateBoard();

            const displayTurnP = document.querySelector("#display-turn");
            displayTurnP.style.display = "block";
            displayTurnP.innerText = "X turn";
        };

        const displayTurn = (player) => {
            const displayTurnP = document.querySelector("#display-turn");
            displayTurnP.innerText = `Now it's ${player.playerName} turns`;
        }

        const handleMove = cellIndex => {
            if (gameBoard.board[cellIndex] !== emptyCell) return;

            gameBoard.setLetter(cellIndex, currentPlayer.playerLetter);
            gameBoard.updateBoard();
            numeroJugada++;

            if (gameBoard.checkWinner() !== emptyCell) {
                alert(`${currentPlayer.playerName} wins!!`);
                restartGame();
                return;
            }

            if (numeroJugada === 9) {
                alert("Draw!!");
                restartGame();
                return;
            }

            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            displayTurn(currentPlayer);
        }

        const handleClick = event => {
            const cellIndex = parseInt(event.target.dataset.index);
            handleMove(cellIndex);
        };

        return { startGame };
    }

    const gameBoard = GameBoard(boardDiv);
    const game = Game(gameBoard);
    game.startGame();
});