const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const initialStones = input.trim().split(' ').map(stone => parseInt(stone));

function calculateLength(stone, depth, cache) {
    if (depth === 0) return 1;

    const key = `${stone},${depth}`;
    if (cache.has(key)) return cache.get(key);

    let length = 0;

    // Is 0
    if (stone === 0) {
        length = calculateLength(1, depth - 1, cache);
    }

    // Is even length
    else if (stone.toString().length % 2 === 0) {
        const halfLength = stone.toString().length / 2;
        const firstHalf = parseInt(stone.toString().slice(0, halfLength));
        const secondHalf = parseInt(stone.toString().slice(halfLength));

        length = calculateLength(firstHalf, depth - 1, cache) + calculateLength(secondHalf, depth - 1, cache);
    }

    // Otherwise
    else {
        const calc = stone * 2024;
        length = calculateLength(calc, depth - 1, cache);
    }

    cache.set(key, length);
    return length;
}

let totalStones = 0;
const cache = new Map();

for (const stone of initialStones) {
    totalStones += calculateLength(stone, 75, cache);
}

console.log(totalStones);
