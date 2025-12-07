const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');
let total = 0;

/**
 * @param {string} bank 
 */
function getMaxJoltage(bank) {
    let joltage = "";

    let lastIndex = 0;
    for (let i = 0; i < 12; i++) {
        const [largestNum, index] = getLargestNumWithXSubsequent(bank.slice(lastIndex), (12 - i - 1));

        joltage += largestNum.toString();
        lastIndex = lastIndex + index;
    }

    return parseInt(joltage);
}

/**
 * @param {string} bank
 * @param {number} x
 */
function getLargestNumWithXSubsequent(bank, x) {
    let largest = -1;
    let index = -1;

    for (let i = 0; i < bank.length; i++) {
        if (bank.length - i - 1 < x) break;

        const num = parseInt(bank[i]);
        if (num > largest) {
            largest = num;
            index = i;
        }
    }

    return [largest, index + 1];
}

for (const bank of lines) {
    const maxJoltage = getMaxJoltage(bank);
    total += maxJoltage;
}

console.log(total);