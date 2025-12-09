const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const coords = input.split('\n').map(line => line.split(',').map(Number));

let largetArea = -1;
for (let i = 0; i < coords.length; i++) {
    const [aX, aY] = coords[i];
    for (let j = 0; j < coords.length; j++) {
        const [bX, bY] = coords[j];

        if (aX == bX && aY == bY) continue;

        const area = Math.abs(bX - aX + 1) * Math.abs(bY - aY + 1);
        if (area > largetArea) largetArea = area;
    }
}

console.log(largetArea);