const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const initialStones = input.trim().split(' ').map(stone => parseInt(stone));

function blink(stones) {
    const newStones = [];

    for (const oldStone of stones) {
        // Is 0
        if (oldStone == 0) {
            newStones.push(1);
            continue;
        }

        // Is even
        if (oldStone.toString().length % 2 == 0) {
            const firstHalf = oldStone.toString().slice(0, oldStone.toString().length / 2);
            const secondHalf = oldStone.toString().slice(oldStone.toString().length / 2);

            newStones.push(parseInt(firstHalf));
            newStones.push(parseInt(secondHalf));

            continue;
        }

        // Otherwise
        newStones.push(oldStone * 2024);
    }

    return newStones;
}

let currentStones = initialStones;
for (let i = 0; i < 25; i++) {
    currentStones = blink(currentStones);
}

console.log(currentStones.length);