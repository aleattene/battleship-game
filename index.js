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

console.log(createEmptyBoard(boardDimension));