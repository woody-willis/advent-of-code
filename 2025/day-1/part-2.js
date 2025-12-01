const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

let dial = 50;
let total = 0;
for (const line of lines) {
    const direction = line[0];
    const value = parseInt(line.slice(1), 10);

    console.log(direction, value);

    for (let i = 0; i < value; i++) {
        if (direction === "R") {
            dial += 1;
        } else if (direction === "L") {
            dial -= 1;
        }

        if (dial > 99) {
            dial = 0;
        } else if (dial < 0) {
            dial = 99;
        }

        if (dial === 0) {
            total += 1;
        }
    }
}

console.log(total);