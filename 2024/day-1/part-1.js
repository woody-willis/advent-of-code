const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const list1 = lines.map((line) => parseInt(line.split('   ')[0])).sort((a, b) => a - b);
const list2 = lines.map((line) => parseInt(line.split('   ')[1])).sort((a, b) => a - b);

const distances = list1.map((value, index) => Math.abs(value - list2[index]));
const sum = distances.reduce((acc, value) => acc + value, 0);

console.log(sum);