/*
Challenge BATTLESHIP
*/
/*
import promptSync from 'prompt-sync';
const prompt = promptSync();

const boardDimension = prompt("Choose the Board dimension (between 5 and 10): ");
*/


function createEmptyBoard(dimension) {
    let board = [];
    for (let i = 0; i < dimension; i++) {
        let row = [];
        for (let j = 0; j < dimension; j++) {
            row.push(0)
        }
        board.push(row)
    }
    return board
}


function modifyBoard(player_board, position){
    let row = position.charCodeAt(0) - 65
    player_board[row][position[1]-1] = 1;
    // console.log(row)
}


function generateBoard(boardDimension, player_positions){
    let board = createEmptyBoard(boardDimension)
    player_positions.forEach(element => modifyBoard(board, element));
    return board
}

let boardDimension = 5;
let player_01_positions = ["A4", "A2", "A3", "B4", "B5", "C1", "D3", "E5"]
let player_02_positions = ["A1", "A2", "B1", "B2", "B3", "C2", "D3", "E1"]

// Player 01 Board
let player_01_board = generateBoard(boardDimension, player_01_positions)

// Player 02 Board
let player_02_board = generateBoard(boardDimension, player_02_positions)

console.log(player_01_board)
console.log(player_02_board)


