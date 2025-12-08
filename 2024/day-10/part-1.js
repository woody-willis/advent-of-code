const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const map = input.split('\n').map(row => row.split('').map(cell => parseInt(cell)));

function traverseForEnds(x, y, currentNumber, countedCoordinates = []) {
    const directions = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
    ];

    let score = 0;

    for (let i = 0; i < directions.length; i++) {
        const [diffX, diffY] = directions[i];
        const nextX = x + diffX;
        const nextY = y + diffY;

        if (countedCoordinates.includes(`${nextX},${nextY}`)) continue;

        if (nextX >= 0 && nextX < map[y].length && nextY >= 0 && nextY < map.length) {
            if (map[nextY][nextX] - map[y][x] !== 1) continue;

            countedCoordinates.push(`${nextX},${nextY}`);

            if (map[nextY][nextX] === 9) {
                score += 1;
            } else if (map[nextY][nextX] === currentNumber + 1) {
                score += traverseForEnds(nextX, nextY, currentNumber + 1, countedCoordinates);
            }
        }
    }

    return score;
}

let total = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === 0) {
            const score = traverseForEnds(x, y, 0);
            total += score;
        }
    }
}

console.log(total);