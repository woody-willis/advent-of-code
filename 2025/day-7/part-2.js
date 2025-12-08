const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const diagram = input.split('\n').map(line => line.split(''));
const height = diagram.length;
const width = diagram[0].length;

let currentBeams = new Map();

const startX = diagram[0].findIndex(a => a == "S");
if (startX !== -1) {
    currentBeams.set(startX, 1n);
}

let totalTimelines = 1n;

for (let y = 0; y < height - 1; y++) {
    const nextBeams = new Map();
    const nextY = y + 1;

    for (const [x, count] of currentBeams) {
        if (nextY >= height) continue;

        const cell = diagram[nextY][x];

        if (cell === "^") {
            let splits = 0;
            if (x + 1 < width) {
                const nextCount = (nextBeams.get(x + 1) || 0n) + count;
                nextBeams.set(x + 1, nextCount);
                splits++;
            }
            if (x - 1 >= 0) {
                const nextCount = (nextBeams.get(x - 1) || 0n) + count;
                nextBeams.set(x - 1, nextCount);
                splits++;
            }

            if (splits === 2) {
                totalTimelines += count;
            }
        } else {
            const nextCount = (nextBeams.get(x) || 0n) + count;
            nextBeams.set(x, nextCount);
        }
    }

    currentBeams = nextBeams;
    if (currentBeams.size === 0) break;
}

console.log(totalTimelines.toString());