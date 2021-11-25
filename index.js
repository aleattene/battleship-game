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

let boardDimension = 5;

board = createEmptyBoard(boardDimension)  // ?
console.log(board);

let player_01_positions = ["A4", "A2", "A3", "B4", "B5", "C1", "D3", "E5"]

player_01_positions.forEach(element => modifyBoard(element));

console.log(board);

function modifyBoard(position){
    let row = position.charCodeAt(0) - 65
    board[row][position[1]-1] = 1;
    // console.log(row)
}