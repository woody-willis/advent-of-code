const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const ranges = input.split(',');
let total = 0;

/**
 * @param {string} id
 */
function isIDValid(id) {
    id = id.toString();

    for (let i = 0; i < id.length; i++) {
        const part = id.slice(0, i);
        if (id.length % part.length != 0) continue;
        if (part.repeat(id.length / part.length) == id) return false;
    }

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