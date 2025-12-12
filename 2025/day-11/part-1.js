const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const deviceOutputs = new Map();

for (const line of lines) {
    const [device, outputs] = line.split(': ');
    deviceOutputs.set(device, outputs.split(' '));
}

const currentPath = ['you'];
let totalPaths = 0;
function countPaths(a, b) {
    if (a == b) {
        totalPaths += 1;
        return;
    }

    const nextNodes = deviceOutputs.get(a);
    for (const node of nextNodes) {
        currentPath.push(node);
        countPaths(node, b);
        currentPath.pop();
    }
}

countPaths('you', 'out');
console.log(totalPaths);