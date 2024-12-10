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

let total = 0;

for (let i = printQueueStartIndex; i < lines.length; i++) {
  const line = lines[i].split(',').map(x => parseInt(x));

  let safe = true;

  for (const rule of printRules) {
    const [first, second] = rule;
    if (line.indexOf(first) === -1 || line.indexOf(second) === -1) continue;
    if (line.indexOf(first) > line.indexOf(second)) {
        safe = false;
        break;
    }
  }

  if (safe) {
    total += line[Math.floor(line.length / 2)];
  }
}

console.log(total);