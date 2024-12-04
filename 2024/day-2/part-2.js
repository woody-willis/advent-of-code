const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

function isSafe(reportLevels) {
    let maxDiff = 0;
    let isAllIncreasing = true;
    let isAllDecreasing = true;
    
    for (let i = 0; i < reportLevels.length-1; i++) {
        const j = i + 1;

        const diff = Math.abs(reportLevels[i] - reportLevels[j]);

        if (reportLevels[i] < reportLevels[j]) {
            isAllIncreasing = false;
        }
        if (reportLevels[i] > reportLevels[j]) {
            isAllDecreasing = false;
        }
        if (diff === 0) {
            isAllIncreasing = false;
            isAllDecreasing = false;
            break;
        }
        if (diff > maxDiff) {
            maxDiff = diff;
        }
    }

    if (maxDiff <= 3) {
        if (isAllIncreasing || isAllDecreasing) {
            return true;
        }
    }

    return false;
}

let total = 0;
for (const line of lines) {
    const reportLevels = line.split(' ').map(Number);
    
    for (let i = 0; i < reportLevels.length; i++) {
        const reportLevelsCopy = [...reportLevels];
        reportLevelsCopy.splice(i, 1);
        if (isSafe(reportLevelsCopy)) {
            total++;
            break;
        }
    }
}

console.log(total);