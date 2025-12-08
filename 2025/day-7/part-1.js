const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const diagram = input.split('\n').map(line => line.split(''));

const beamLocations = [
    [diagram[0].findIndex(a => a == "S"), 0]
];
let totalSplits = 0;

while (beamLocations.length > 0) {
    const beamLocationCopy = [...beamLocations];
    for (const [oldX, oldY] of beamLocationCopy) {
        const newX = oldX;
        const newY = oldY + 1;

        if (newY >= diagram.length) {
            beamLocations.splice(beamLocations.indexOf([oldX, oldY]), 1);
            continue;
        }

        if (diagram[newY][newX] == "^") {
            beamLocations.splice(beamLocations.indexOf([oldX, oldY]), 1);

            let didSplit = false;

            if (newX + 1 < diagram[newY].length && diagram[newY][newX + 1] !== "|") {
                diagram[newY][newX + 1] = "|";
                beamLocations.push([newX + 1, newY]);
                didSplit = true;
            }
            if (newX - 1 >= 0 && diagram[newY][newX - 1] !== "|") {
                diagram[newY][newX - 1] = "|";
                beamLocations.push([newX - 1, newY]);
                didSplit = true;
            }

            if (didSplit) {
                totalSplits += 1;
            }

            continue;
        }

        diagram[newY][newX] = "|";

        beamLocations.splice(beamLocations.indexOf([oldX, oldY]), 1);
        beamLocations.push([newX, newY]);
    }
}

console.log(totalSplits);