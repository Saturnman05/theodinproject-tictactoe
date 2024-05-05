document.addEventListener("DOMContentLoaded", () => {
    const boardDiv = document.querySelector(".board");
    
    const emptyCell = "-";
    const x = "X";
    const o = "O";

    // Gameboard object
    function GameBoard() {
        const board = Array(9).fill(emptyCell);

        const setLetter = (place, letter) => (board[place] === emptyCell) ? board[place] = letter : board[place] = board[place];
        const clearBoard = () => { for (let cell of board) cell = emptyCell };

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

        const checkGameOver = () => {
            if (checkWinner() !== emptyCell) return true;

            for (let i = 0; i < board.length; i++) {
                if (board[i] !== emptyCell) return false;
            }

            return true;
        };

        return { board, setLetter, clearBoard, updateBoard, checkWinner, checkGameOver };
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
        const players = [player1, player2];


    }

    const gameBoard = GameBoard(boardDiv);
    const game = Game(gameBoard);
});