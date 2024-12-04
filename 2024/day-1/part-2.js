const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const list1 = lines.map((line) => parseInt(line.split('   ')[0])).sort((a, b) => a - b);
const list2 = lines.map((line) => parseInt(line.split('   ')[1])).sort((a, b) => a - b);

let total = 0;
for (let i = 0; i < list1.length; i++) {
    const amountOfAppearancesInList2 = list2.filter((value) => value === list1[i]).length;
    total += list1[i] * amountOfAppearancesInList2;
}

console.log(total);