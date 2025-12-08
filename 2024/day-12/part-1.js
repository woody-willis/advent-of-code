const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n').map(line => line.split(''));

const visited = new Set();

function calculateArea(x, y, region) {
    let area = 0;
    
    const queue = [[x, y]];
    
    while (queue.length > 0) {
        const [x, y] = queue.shift();
    
        if (y < 0 || y >= lines.length || x < 0 || x >= lines[y].length) {
            continue;
        }
    
        if (lines[y][x] !== region) {
            continue;
        }

        if (visited.has(`${x},${y}`)) {
            continue;
        }
        visited.add(`${x},${y}`);
    
        area++;
    
        queue.push([x + 1, y]);
        queue.push([x - 1, y]);
        queue.push([x, y + 1]);
        queue.push([x, y - 1]);
    }
    
    return area;
}

function calculatePerimeter(x, y, region) {
    let perimeter = 0;
    
    const queue = [[x, y]];
    const perimeterVisited = new Set();
    
    while (queue.length > 0) {
        const [x, y] = queue.shift();
    
        if (y < 0 || y >= lines.length || x < 0 || x >= lines[y].length) {
            perimeter++;
            continue;
        }

        if (lines[y][x] !== region) {
            perimeter++;
            continue;
        }

        if (perimeterVisited.has(`${x},${y}`)) {
            continue;
        }
        perimeterVisited.add(`${x},${y}`);
    
        queue.push([x + 1, y]);
        queue.push([x - 1, y]);
        queue.push([x, y + 1]);
        queue.push([x, y - 1]);
    }
    
    return perimeter;
}

let total = 0;

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    const region = lines[y][x];

    const area = calculateArea(x, y, region);
    if (area == 0) continue;
    
    const perimeter = calculatePerimeter(x, y, region);

    total += area * perimeter;
  }
}

console.log(total);