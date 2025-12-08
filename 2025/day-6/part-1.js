const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');
const operations = lines[lines.length - 1];

const columnWidths = [];

let currentWidth = 1;
for (let i = 0; i < operations.length; i++) {
    if (operations[i] == " ") {
        currentWidth++;
        continue;
    }

    if (currentWidth <= 1) continue;

    columnWidths.push(currentWidth);
    currentWidth = 1;
}
columnWidths.push(currentWidth);

const operationArr = operations.split(/ */g).filter(a => a.length > 0);

let total = 0;
let currentIdx = 0;
for (let i = 0; i < columnWidths.length; i++) {
    const width = columnWidths[i];
    const operands = [];

    for (const line of lines.slice(0, lines.length - 1)) {
        const num = line.slice(currentIdx, currentIdx + width);
        operands.push(parseInt(num.replace(/ /g, "")));
    }

    let result = 0;

    switch (operationArr[i]) {
        case "*":
            result = 1;
            for (const num of operands) {
                result *= num;
            }
            break;
        case "+":
            for (const num of operands) {
                result += num;
            }
            break;
    }

    currentIdx += width;
    total += result;
}

console.log(total);