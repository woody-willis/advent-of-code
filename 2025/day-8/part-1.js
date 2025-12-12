const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const boxes = input.split('\n').map(line => line.split(',').map(Number));

let circuits = [];
for (let i = 0; i < boxes.length; i++) {
    circuits.push([i.toString()]);
}

function calculateDistance(boxA, boxB) {
    return Math.sqrt(Math.abs(boxA[0] - boxB[0]) ** 2 + Math.abs(boxA[1] - boxB[1]) ** 2 + Math.abs(boxA[2] - boxB[2]) ** 2);
}

const memo = {};

function getClosestPairs() {
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes.length; j++) {
            if (i == j) continue;

            const distance = calculateDistance(boxes[i], boxes[j])
            memo[Math.min(i, j).toString() + ',' + Math.max(i, j).toString()] = distance;
        }
    }
}

getClosestPairs();
const sortedDistances = Object.entries(memo).sort(([, v1], [, v2]) => v1 - v2);

let maxPairs = 10;
// let maxPairs = 1000;
for (let i = 0; i < maxPairs; i++) {
    const [key, distance] = sortedDistances[i];
    const [boxAIdx, boxBIdx] = key.split(',');

    const iCircuitIdx = circuits.findIndex(c => c.includes(boxAIdx));
    const jCircuitIdx = circuits.findIndex(c => c.includes(boxBIdx));
    if (iCircuitIdx == jCircuitIdx) {
        continue;
    }

    circuits[iCircuitIdx] = [...circuits[iCircuitIdx], ...circuits[jCircuitIdx]];
    circuits.splice(jCircuitIdx, 1);
}

circuits.sort((a, b) => {
    return b.length - a.length;
});

console.log(circuits[0].length * circuits[1].length * circuits[2].length);