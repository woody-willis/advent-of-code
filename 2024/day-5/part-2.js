const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const printRules = [];

let printQueueStartIndex = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line === '') {
    printQueueStartIndex = i + 1;
    break;
  }

  const [first, second] = line.split('|').map(x => parseInt(x));
  printRules.push([first, second]);
}

function doesFollowPrintRules(line) {
  for (const rule of printRules) {
    const [first, second] = rule;
    if (line.indexOf(first) === -1 || line.indexOf(second) === -1) continue;
    if (line.indexOf(first) > line.indexOf(second)) {
        return false;
    }
  }

  return true;
}

function printRulesSort(a, b) {
  const printRule = printRules.find(rule => rule[0] === a && rule[1] === b || rule[0] === b && rule[1] === a);

  if (printRule) {
    return a === printRule[0] ? -1 : 1;
  }
}

let total = 0;

for (let i = printQueueStartIndex; i < lines.length; i++) {
  const line = lines[i].split(',').map(x => parseInt(x));

  if (!doesFollowPrintRules(line)) {
    const sortedLine = line.slice().sort(printRulesSort);
    
    total += sortedLine[Math.floor(sortedLine.length / 2)];
  }
}

console.log(total);