const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const ranges = input.split(',');
let total = 0;

/**
 * @param {string} id
 */
function isIDValid(id) {
    id = id.toString();

    if (id.length % 2 != 0) return true;
    if (id.slice(0, Math.round(id.length / 2)) == id.slice(Math.round(id.length / 2))) return false;

    return true;
}

for (const range of ranges) {
    const [start, end] = range.split('-').map(n => parseInt(n, 10));

    for (let i = start; i <= end; i++) {
        if (!isIDValid(i)) {
            total += i;
        }
    }
}

console.log(total);