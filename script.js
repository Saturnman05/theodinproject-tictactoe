document.addEventListener("DOMContentLoaded", () => {
    // Gameboard object
    function GameBoard() {
        const emptyCell = "-";
        const board = Array(9).fill(emptyCell);

        const setLetter = (place, letter) => (board[place] === emptyCell) ? board[place] = letter : board[place] = board[place];
        const clearBoard = () => { for (let cell of board) cell = emptyCell; }
        const showBoard = () => {
            console.log(` ${board[0]}|${board[1]}|${board[2]}`);
            console.log("-------");
            console.log(` ${board[3]}|${board[4]}|${board[5]}`);
            console.log("-------")
            console.log(` ${board[6]}|${board[7]}|${board[8]}`);
        };

        return { board, setLetter, clearBoard, showBoard };
    };

    // Players object
    function Player(playerLetter) {
        const playerAction = () => {
            do {
                var cell = prompt("Select a cell number to play: ");
            } while (cell > 9 || cell < 0);
            return cell - 1;
        };

        return { playerLetter, playerAction };
    }

    // Game object
    function Game(gameBoard, playerX, playerO) {
        let jugar = true;
        let isX = true;
        let jugada;
        let player;

        const startGame = () => {
            while(jugar) {
                gameBoard.showBoard();

                if (isX) {
                    player = playerX;
                } else {
                    player = playerO;
                }
                isX = !isX;

                jugada = player.playerAction();
                gameBoard.setLetter(jugada, player.playerLetter);
            }
        }

        return { startGame };
    }

    const gameBoard = GameBoard();

    const playerX = Player("X");
    const playerO = Player("O");

    let game = Game(gameBoard, playerX, playerO);
    game.startGame();
});