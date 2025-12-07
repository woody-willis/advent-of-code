const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const ranges = lines.slice(0, lines.indexOf('')).map((range) => {
    const [start, end] = range.split("-");
    return [parseInt(start), parseInt(end)];
});

ranges.sort((a, b) => {
    return a[0] - b[0];
});

const merged = [];
if (ranges.length > 0) {
    merged.push(ranges[0]);

    for (let i = 1; i < ranges.length; i++) {
        const last = merged[merged.length - 1];
        const current = ranges[i];

        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            merged.push(current);
        }
    }
}

console.log(merged.map((range) => {
    return range[1] - range[0] + 1;
}).reduce((partialSum, a) => partialSum + a, 0));