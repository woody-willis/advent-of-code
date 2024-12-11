const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

let map = input.split('\n').map(line => line.split(''));

function doesResultInLoop(checkMap) {
    let guardX = 0;
    let guardY = 0;
    let guardRotation = 0;
    for (let y = 0; y < checkMap.length; y++) {
        for (let x = 0; x < checkMap[y].length; x++) {
            if (checkMap[y][x] === '^') {
                guardX = x;
                guardY = y;
                guardRotation = 0;
            } else if (checkMap[y][x] === '>') {
                guardX = x;
                guardY = y;
                guardRotation = 1;
            } else if (checkMap[y][x] === 'v') {
                guardX = x;
                guardY = y;
                guardRotation = 2;
            } else if (checkMap[y][x] === '<') {
                guardX = x;
                guardY = y;
                guardRotation = 3;
            }
        }
    }

    let counter = 0;
    while (counter < 10000) {
        if (guardRotation === 0) {
            guardY--;
        } else if (guardRotation === 1) {
            guardX++;
        } else if (guardRotation === 2) {
            guardY++;
        } else if (guardRotation === 3) {
            guardX--;
        }

        if (guardY < 0 || guardY >= checkMap.length || guardX < 0 || guardX >= checkMap[guardY].length) {
            return false;
        }

        if (checkMap[guardY][guardX] === '#') {
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

        counter++;
    }

    return true;
}

let amountOfLoops = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        oldChar = map[y][x];
        map[y][x] = '#';
        if (doesResultInLoop(map)) {
            amountOfLoops++;
        }
        map[y][x] = oldChar;
    }
}

console.log(amountOfLoops);