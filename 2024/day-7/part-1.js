const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

function calc(operatorNums, operators) {
    let result = operatorNums[0];
    for (let i = 1; i < operatorNums.length; i++) {
        if (operators[i-1] === '+') {
            result += operatorNums[i];
        } else if (operators[i-1] === '*') {
            result *= operatorNums[i];
        }
    }
    return result;
}

let total = 0;

for (const line of lines) {
    const testNum = parseInt(line.split(': ')[0]);
    const operatorNums = line.split(': ')[1].split(' ').map(x => parseInt(x));
    let operators = '0'.padStart(operatorNums.length-1, '0').split('').map(x => x === '1' ? '*' : '+');

    if (calc(operatorNums, operators) === testNum) {
        total += testNum;
        continue;
    }

    const max = parseInt('1'.padStart(operatorNums.length-1, '1'), 2)+1;

    for (let i = 0; i < max; i += 1) {
        operators = (i >>> 0).toString(2).padStart(operatorNums.length-1, '0').split('').map(x => x === '1' ? '*' : '+').reverse();

        if (calc(operatorNums, operators) === testNum) {
            total += testNum;
            break;
        }
    }
}

console.log(total);