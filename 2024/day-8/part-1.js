const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const map = input.split('\n').map(line => line.split(''));

const frequencyLocations = {};

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === '.' || map[y][x] === '#') continue;

    const frequency = map[y][x];

    if (!frequencyLocations[frequency]) frequencyLocations[frequency] = [];
    if (!frequencyLocations[frequency].includes([x, y])) frequencyLocations[frequency].push([x, y]);
  }
}

const frequencies = Object.keys(frequencyLocations);
for (let i = 0; i < frequencies.length; i++) {
    const antennaLocations = frequencyLocations[frequencies[i]];
    for (const antennaLocation of antennaLocations) {
        const [x, y] = antennaLocation;
        
        const locationDifferences = [];
        for (const otherAntennaLocation of antennaLocations) {
            const [otherX, otherY] = otherAntennaLocation;
            if (otherX === x && otherY === y) continue;
            locationDifferences.push([otherX - x, otherY - y]);
        }

        for (let j = 0; j < locationDifferences.length; j++) {
            const antinodeX = x + locationDifferences[j][0]*2;
            const antinodeY = y + locationDifferences[j][1]*2;

            if (antinodeX < 0 || antinodeX >= map[0].length || antinodeY < 0 || antinodeY >= map.length) continue;
            if (map[antinodeY][antinodeX] === '#') continue;

            map[antinodeY][antinodeX] = '#';
        }
    }
}

let total = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '#') total++;
    }
}
console.log(total);