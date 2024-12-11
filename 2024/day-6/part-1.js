const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

let map = input.split('\n').map(line => line.split(''));

let guardX = 0;
let guardY = 0;
let guardRotation = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '^') {
            guardX = x;
            guardY = y;
            guardRotation = 0;
        } else if (map[y][x] === '>') {
            guardX = x;
            guardY = y;
            guardRotation = 1;
        } else if (map[y][x] === 'v') {
            guardX = x;
            guardY = y;
            guardRotation = 2;
        } else if (map[y][x] === '<') {
            guardX = x;
            guardY = y;
            guardRotation = 3;
        }
    }
}

while (true) {
    let oldGuardX = guardX;
    let oldGuardY = guardY;

    if (guardRotation === 0) {
        guardY--;
    } else if (guardRotation === 1) {
        guardX++;
    } else if (guardRotation === 2) {
        guardY++;
    } else if (guardRotation === 3) {
        guardX--;
    }

    if (guardY < 0 || guardY >= map.length || guardX < 0 || guardX >= map[guardY].length) {
        break;
    }

    if (map[guardY][guardX] === '#') {
        if (guardRotation === 0) {
            guardY++;
            guardRotation = 1;
        } else if (guardRotation === 1) {
            guardX--;
            guardRotation = 2;
        } else if (guardRotation === 2) {
            guardY--;
            guardRotation = 3;
        } else if (guardRotation === 3) {
            guardX++;
            guardRotation = 0;
        }
    }

    map[oldGuardY][oldGuardX] = 'X';
}

let result = 1;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === 'X') {
            result++;
        }
    }
}

console.log(result);