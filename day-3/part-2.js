const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const line = input.split('\n').join('');

const mulRegex = /mul\(\d+,\d+\)/g;
const dontRegex = /don't\(\)/g;
const doRegex = /do\(\)/g;

let total = 0;

let enabled = true;

for (let i = 0; i < line.length; i++) {
    if (line[i] === 'm') {
        const match = line.slice(i, i+12).match(mulRegex);
        if (!match || !enabled) continue;
        const nums = match[0].match(/\d+/g).map(Number);
        total += nums[0] * nums[1];
    } else if (line[i] === 'd') {
        const matchDont = line.slice(i, i+7).match(dontRegex);
        const matchDo = line.slice(i, i+7).match(doRegex);
        if (!matchDont && !matchDo) continue;

        if (matchDont) {
            enabled = false;
        } else {
            enabled = true;
        }
    }
}

console.log(total);