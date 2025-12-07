const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');
let total = 0;

/**
 * @param {string} bank 
 */
function getMaxJoltage(bank) {
    let max = 0;
    for (let i = 0; i < bank.length; i++) {
        for (let j = i + 1; j < bank.length; j++) {
            if (i == j) continue;

            const joltage = parseInt(bank[i] + bank[j]);
            if (joltage > max) max = joltage;
        }
    }

    return max;
}

for (const bank of lines) {
    const maxJoltage = getMaxJoltage(bank);
    total += maxJoltage;
}

console.log(total);