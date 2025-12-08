const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const filesystem = input.split('');
const ids = [];

let currentId = 0;
for (let i = 0; i < filesystem.length; i++) {
    if (i % 2 === 0) {
        for (let j = 0; j < parseInt(filesystem[i]); j++) {
            ids.push(currentId.toString());
        }

        currentId++;
    } else {
        for (let j = 0; j < parseInt(filesystem[i]); j++) {
            ids.push('.');
        }
    }
}

for (let i = ids.length-1; i >= 0; i--) {
    const char = ids[i];

    if (char === '.') {
        continue;
    }

    for (let j = 0; j < ids.length; j++) {
        if (j >= i) {
            break;
        }

        if (ids[j] === '.') {
            ids[j] = char;
            ids[i] = '.';
            break;
        }
    }
}

let checksum = 0;
for (let i = 0; i < ids.length; i++) {
    if (ids[i] === '.') {
        continue;
    }

    checksum += parseInt(ids[i]) * i;
}

console.log(checksum);