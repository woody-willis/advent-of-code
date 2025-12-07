const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const ranges = lines.slice(0, lines.indexOf('')).map((range) => {
    const [start, end] = range.split("-");
    return [parseInt(start), parseInt(end)];
});
const ids = lines.slice(lines.indexOf(''));

function isIdFresh(id) {
    for (const [start, end] of ranges) {
        if (id >= start && id <= end) {
            return true;
        }
    }
}

let total = 0;

for (const id of ids) {
    if (isIdFresh(id)) total += 1;
}

console.log(total);