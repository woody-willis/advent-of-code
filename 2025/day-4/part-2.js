const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

let diagram = input.split('\n').map(line => line.split(''));

const searchMatrix = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
];

function performRemoval() {
    const newDiagram = diagram.map(function (line) {
        return line.slice();
    });

    let reachableRolls = 0;

    for (let y = 0; y < diagram.length; y++) {
        for (let x = 0; x < diagram[y].length; x++) {
            if (diagram[y][x] != "@") continue;

            let totalRolls = 0;

            for (const [xOffset, yOffset] of searchMatrix) {
                const newX = x + xOffset;
                const newY = y + yOffset;

                if (newX < 0 || newX >= diagram[y].length) continue;
                if (newY < 0 || newY >= diagram.length) continue;

                if (diagram[newY][newX] == "@") {
                    totalRolls += 1;
                }
            }

            if (totalRolls < 4) {
                newDiagram[y][x] = ".";
                reachableRolls += 1;
            }
        }
    }

    diagram = newDiagram;

    return reachableRolls;
}

let totalRemoved = 0;

while (true) {
    const removedRolls = performRemoval();
    if (removedRolls == 0) break;

    totalRemoved += removedRolls;
}

console.log(totalRemoved);