const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

function calc(operatorNumsOrig, operatorsOrig) {
    let operatorNums = [...operatorNumsOrig];
    let operators = [...operatorsOrig];

    let result = operatorNums[0];
    for (let i = 1; i < operatorNums.length; i++) {
        if (operators[i-1] === '+') {
            result += operatorNums[i];
        } else if (operators[i-1] === '*') {
            result *= operatorNums[i];
        } else if (operators[i-1] === '||') {
            result = parseInt(result.toString() + operatorNums[i].toString());
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

    const max = parseInt('2'.padStart(operatorNums.length-1, '2'), 3);

    for (let i = 0; i < max; i += 1) {
        operators = (i >>> 0).toString(3).padStart(operatorNums.length-1, '0').split('').map(x => x === '1' ? '*' : (x === '2' ? '||' : '+')).reverse();

        if (calc(operatorNums, operators) === testNum) {
            total += testNum;
            break;
        }
    }
}

console.log(total);