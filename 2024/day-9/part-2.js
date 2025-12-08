const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const filesystem = input.trim().split('');

let blocks = [];
let isFile = true;
let currentId = 0;

for (let i = 0; i < filesystem.length; i++) {
    let count = Number(filesystem[i]);
    for (let j = 0; j < count; j++) {
        blocks.push(isFile ? currentId : null);
    }
    if (isFile) currentId++;
    isFile = !isFile;
}

let files = [];
for (let id = 0; id < currentId; id++) {
    let size = blocks.filter(b => b === id).length;
    files.push({ id, size });
}

files.sort((a, b) => b.id - a.id);

for (let file of files) {
    let size = file.size;
    let fileIndex = blocks.findIndex(b => b === file.id);

    for (let i = 0; i < fileIndex; i++) {
        let span = blocks.slice(i, i + size);
        if (span.every(b => b === null)) {
            for (let j = 0; j < size; j++) {
                blocks[i + j] = file.id;
                blocks[fileIndex + j] = null;
            }
            break;
        }
    }
}

let checksum = 0;
for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== null) {
        checksum += i * blocks[i];
    }
}

console.log(checksum);