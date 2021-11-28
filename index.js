/*
Challenge BATTLESHIP
*/

const prompt = require('prompt-sync')();
let boardDimension = prompt("Choose the Board dimension (between 5 and 10): ");

if (boardDimension < 5 || boardDimension > 10) {
    boardDimension = 5;
}

let numPlayers = prompt("Choose the number of players (between 0 and 2): ");
if (numPlayers < 0 || boardDimension > 2) {
    numPlayers = 0;
}

function createEmptyBoard(dimension) {
    let board = [];
    for (let i = 0; i < dimension; i++) {
        let row = [];
        for (let j = 0; j < dimension; j++) {
            row.push(0);
        }
        board.push(row);
    }
    return board;
}


function modifyBoard(player_board, position, isShip){
    let row = position.charCodeAt(0) - 65;
    player_board[row][position[1]-1] = isShip;
    // console.log(row)
}


function generateBoard(boardDimension, player_positions){
    let board = createEmptyBoard(boardDimension);
    player_positions.forEach(element => modifyBoard(board, element, 1));
    return board;
}

// let boardDimension = 5;
let fleetElements = 8;
let player_01_positions = ["A4", "A2", "A3", "B4", "B5", "C1", "D3", "E5"];
let player_02_positions = ["A1", "A2", "B1", "B2", "B3", "C2", "D3", "E1"];
let cpu_positions = generateCpuPositions(fleetElements, boardDimension)


function generatePosition(boardDimension){
    // Returns a random integer between min (include) and max (include)
    let number = Math.floor(Math.random() * (boardDimension - 1 + 1)) + 1;
    let row = String.fromCharCode(number + 64);
    let col = Math.floor(Math.random() * (boardDimension - 1 + 1)) + 1;
    return row + col
}


function generateCpuPositions(fleetElements, boardDimension) {
    let cpu_positions = []
    for (let i= 0; i < fleetElements; i++) {
        let position = generatePosition(boardDimension)
        if (cpu_positions.includes(position)) {
            i--;
            continue
        }
        cpu_positions.push(position)
    }
    return cpu_positions.sort()
}

// Player 01 Board
let player_01_board = generateBoard(boardDimension, player_01_positions);

// Player 02 Board
let player_02_board = generateBoard(boardDimension, player_02_positions);

// Cpu Board
let cpu_board = generateBoard(boardDimension, cpu_positions);

// console.log(player_01_board);
// console.log(player_02_board);


function fire(player_defender_positions, player_defender_board, player_attacker, player_attacker_move, player_moves){
    if (player_defender_positions.includes(player_attacker_move)) {
        // console.log(player_defender_positions);
        player_defender_positions.splice(player_defender_positions.indexOf(player_attacker_move), 1);
        modifyBoard(player_defender_board, player_attacker_move, 0);
        console.log(player_attacker, "->", player_attacker_move, "-> BOOM");
        // console.log(player_defender_positions);
        if (player_defender_positions.length === 0){
            console.log(`Game over. The winner is ${player_attacker} (${player_moves.length} moves).`)
        }
    } else {
        console.log(player_attacker, "->", player_attacker_move, "-> splash");
    }
}

/*
fire(player_02_positions, player_02_board, "Player 01",  "A1");
fire(player_02_positions, player_02_board, "Player 01",  "A2");
fire(player_02_positions, player_02_board, "Player 01",  "B1");
fire(player_02_positions, player_02_board, "Player 01",  "B2");
fire(player_02_positions, player_02_board, "Player 01",  "B3");
fire(player_02_positions, player_02_board, "Player 01",  "C2");
fire(player_02_positions, player_02_board, "Player 01",  "A1");
fire(player_02_positions, player_02_board, "Player 01",  "D3");
fire(player_02_positions, player_02_board, "Player 01",  "E1");

console.log(player_02_board);
*/

// console.log(cpu_positions)
// console.log(cpu_board)

if (numPlayers === 0) {
    player_01_positions = generateCpuPositions(7,boardDimension)
    player_01_board = generateBoard(boardDimension, player_01_positions)
    player_02_positions = generateCpuPositions(7,boardDimension)
    player_02_board = generateBoard(boardDimension, player_02_positions)
}

console.log(player_01_board)
console.log(player_02_board)

let player_01_moves = []
let player_02_moves = []
let player_01 = 1
let player_02 = 0

while (true) {
    // console.log(player_01, player_02)
    if (player_01) {
        while (true) {
            let player_01_move = generatePosition(5)
            if (!player_01_moves.includes(player_01_move)) {
                player_01_moves.push(player_01_move)
                fire(player_02_positions, player_02_board, "Player 01", player_01_move, player_01_moves);
                player_01--;
                if (!player_01 || player_02_positions.length === 0) {
                    player_02 = 2
                    break
                }
            }
        }
        if (player_02_positions.length === 0) {
            break
        }
    }
    // console.log(player_01, player_02)
    if (player_02) {
        while (true) {
            let player_02_move = generatePosition(5)
            if (!player_02_moves.includes(player_02_move)) {
                player_02_moves.push(player_02_move)
                fire(player_01_positions, player_01_board, "Player 02", player_02_move, player_02_moves);
                player_02--;
                if (!player_02 || player_01_positions.length === 0) {
                    player_01 = 2
                    break
                }
            }
        }
        if (player_01_positions.length === 0) {
            break
        }
    }
}