const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

let dial = 50;
let total = 0;
for (const line of lines) {
    const direction = line[0];

    switch (direction) {
        case "R":
            dial += parseInt(line.slice(1), 10);
            break;
        case "L":
            dial -= parseInt(line.slice(1), 10);
            break;
    }

    while (dial > 99) {
        dial -= 100;
    }
    while (dial < 0) {
        dial += 100;
    }

    console.log(direction, line.slice(1), "=", dial);

    if (dial === 0) {
        total += 1;
    }
}

console.log(total);