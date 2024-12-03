const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const regex = /mul\(\d+,\d+\)/g;

let total = 0;

const matches = lines.map(line => line.match(regex));
for (const matchArr of matches) {
    if (!matchArr) continue;
    for (const match of matchArr) {
        const nums = match.match(/\d+/g).map(Number);
        total += nums[0] * nums[1];
    }
}

console.log(total);