// SO TURNS OUT IT WAS THIS EASY ALL ALONG
// (why do i do this too myself)

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

function calculateDiagramCoords(presentShape) {
    const coords = [];

    for (let presentY = 0; presentY < presentShape.length; presentY++) {
        for (let presentX = 0; presentX < presentShape[presentY].length; presentX++) {
            if (presentShape[presentY][presentX] == ".") continue;
            coords.push([presentX, presentY]);
        }
    }

    return coords;
}

const presentSizes = new Map();
let currentPresentIdx = -1;
let currentPresentDiagram = [];

const areas = [];

for (const line of lines) {
    if (line.includes(':') && !line.includes('x')) {
        currentPresentIdx = parseInt(line.split(':')[0]);
        continue;
    }

    if (line.trim().length == 0) {
        presentSizes.set(currentPresentIdx, calculateDiagramCoords(currentPresentDiagram).length);

        currentPresentIdx = -1;
        currentPresentDiagram = [];

        continue;
    }

    if (currentPresentIdx >= 0) {
        currentPresentDiagram.push(line.split(''));
        continue;
    }

    if (line.includes('x')) {
        areas.push(line);
        continue;
    }
}

let validAreas = 0;
for (const area of areas) {
    const [size, presentAmountsStr] = area.split(': ');
    const [width, height] = size.split('x').map(Number);

    const presentAmounts = presentAmountsStr.split(' ').map(Number);

    let totalPresentArea = 0;
    presentAmounts.forEach((count, id) => {
        for (let i = 0; i < count; i++) {
            totalPresentArea += presentSizes.get(id);
        }
    });

    if (totalPresentArea > width * height) {
        continue;
    }

    validAreas += 1;
}

console.log(validAreas);
