const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n').map(line => line.split(''));
let editedLines = lines.map(line => line.slice());

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

function calculateSides(editedLines, region) {
    let sides = 0;

    const checkedSideCoords = new Set();

    for (let y = 0; y < editedLines.length; y++) {
        for (let x = 0; x < editedLines[y].length; x++) {
            if (editedLines[y][x] !== region) continue;

            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

            for (const direction of directions) {
                const [dx, dy] = direction;

                const newX = x + dx;
                const newY = y + dy;

                if (newY < 0 || newY >= editedLines.length || newX < 0 || newX >= editedLines[newY].length) {
                    const sideCoords = getSideCoords(newX, newY, region).map(coord => coord.join('|'));
                    for (const sideCoordList of sideCoords) {
                        if (checkedSideCoords.has(sideCoordList)) continue;
                        checkedSideCoords.add(sideCoordList);

                        sides++;
                    }

                    continue;
                }

                if (editedLines[newY][newX] === region) continue;

                const sideCoords = getSideCoords(newX, newY, region).map(coord => coord.join('|'));
                for (const sideCoordList of sideCoords) {
                    if (checkedSideCoords.has(sideCoordList)) continue;
                    checkedSideCoords.add(sideCoordList);

                    sides++;
                }
            }
        }
    }

    return sides;
}

function getSideCoords(x, y, region) {
    const verticalDirection = [[0, 1], [0, -1]];
    const horizontalDirection = [[1, 0], [-1, 0]];

    let isVertical = false;
    if (y >= 0 && y < editedLines.length) {
        for (const direction of horizontalDirection) {
            const [dx, dy] = direction;

            if (editedLines[y][x + dx] === region) {
                isVertical = true;
                break;
            }
        }
    }

    let isHorizontal = false;
    for (const direction of verticalDirection) {
        const [dx, dy] = direction;

        if (y + dy < 0 || y + dy >= editedLines.length) continue;
        if (editedLines[y + dy][x] === region) {
            isHorizontal = true;
            break;
        }
    }

    const totalCoords = [];

    if (isVertical) {

        const xDirections = [];
        if (x - 1 >= 0 && editedLines[y][x - 1] === region) {
            xDirections.push(-1);
        } 
        if (x + 1 < editedLines[y].length && editedLines[y][x + 1] === region) {
            xDirections.push(1);
        }

        for (const direction of xDirections) {
            const sideCoords = [];
            const newX = x + direction;

            for (let i = y; i < editedLines.length; i++) {
                if (editedLines[i][x] === region) break;
                if (editedLines[i][newX] !== region) break;

                sideCoords.push([x, i, 1, direction]);
            }
            for (let i = y - 1; i >= 0; i--) {
                if (editedLines[i][x] === region) break;
                if (editedLines[i][newX] !== region) break;

                sideCoords.push([x, i, 1, direction]);
            }

            const coordsMap = sideCoords.map(coord => coord.join(',')).sort();
            totalCoords.push(coordsMap.filter((item, index) => coordsMap.indexOf(item) === index).map(coord => coord.split(',').map(coord => parseInt(coord))));
        }
    }

    if (isHorizontal) {
        const yDirections = [];
        if (y - 1 >= 0 && editedLines[y - 1][x] === region) {
            yDirections.push(-1);
        } 
        if (y + 1 < editedLines.length && editedLines[y + 1][x] === region) {
            yDirections.push(1);
        }

        for (const direction of yDirections) {
            const sideCoords = [];
            const newY = y + direction;

            for (let i = x; i < editedLines[newY].length; i++) {
                if (y >= 0 && y < editedLines.length) {
                    if (editedLines[y][i] === region) break
                }
                if (editedLines[newY][i] !== region) break;

                sideCoords.push([i, y, 0, direction]);
            }
            for (let i = x - 1; i >= 0; i--) {
                if (y >= 0 && y < editedLines.length) {
                    if (editedLines[y][i] === region) break
                }
                if (editedLines[newY][i] !== region) break;

                sideCoords.push([i, y, 0, direction]);
            }

            const coordsMap = sideCoords.map(coord => coord.join(',')).sort();
            totalCoords.push(coordsMap.filter((item, index) => coordsMap.indexOf(item) === index).map(coord => coord.split(',').map(coord => parseInt(coord))));
        }
    }

    return totalCoords;
}

// https://medium.com/swlh/matrix-rotation-in-javascript-269cae14a124
const rotateMatrix90C = source => {
    // get the dimensions of the source matrix
    const M = source.length;
    const N = source[0].length;

    // create a new NxM destination array
    let destination = new Array(N);
    for (let i = 0; i < N; i++) {
        destination[i] = new Array(M);
    }

    // start copying from source into destination
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            destination[i][j] = source[M - j - 1][i];
        }
    }

    // return the destination matrix
    return destination;
};

let total = 0;

const regionLoopVisited = new Set();
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        if (regionLoopVisited.has(`${x},${y}`)) continue;

        const region = lines[y][x];

        editedLines = lines.map(line => line.slice());
        for (let editY = 0; editY < editedLines.length; editY++) {
            for (let editX = 0; editX < editedLines[editY].length; editX++) {
                if (editedLines[editY][editX] !== region) {
                    editedLines[editY][editX] = '.';
                }
            }
        }

        // Only keep the same regions that are touching
        const queue = [[x, y]];
        const coordsVisited = [];
        while (queue.length > 0) {
            const [x, y] = queue.shift();

            if (y < 0 || y >= editedLines.length || x < 0 || x >= editedLines[y].length) {
                continue;
            }

            if (coordsVisited.includes([x, y].join(','))) {
                continue;
            }

            if (editedLines[y][x] !== region) {
                editedLines[y][x] = '.';
                continue;
            }

            coordsVisited.push([x, y].join(','));
            regionLoopVisited.add(`${x},${y}`);

            queue.push([x + 1, y]);
            queue.push([x - 1, y]);
            queue.push([x, y + 1]);
            queue.push([x, y - 1]);
        }

        for (let editY = 0; editY < editedLines.length; editY++) {
            for (let editX = 0; editX < editedLines[editY].length; editX++) {
                if (!coordsVisited.includes([editX, editY].join(','))) {
                    editedLines[editY][editX] = '.';
                }
            }
        }

        editedLines = editedLines.filter(line => line.includes(region));
        editedLines = rotateMatrix90C(rotateMatrix90C(editedLines).filter(line => line.includes(region)));

        const area = calculateArea(x, y, region);
        if (area == 0) continue;

        const sides = calculateSides(editedLines, region);

        total += area * sides;
    }
}

console.log(total);