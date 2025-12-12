// please click off this file - this is my caffeine fueled mess for day 12
// also don't ask me anything about it, I have no idea how this works
// check out part-1-take-2.js for the (unfortunately) actual solution

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

function matrixRot90CW(matrix) {
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
}
function matrixFlipH(matrix) {
    return matrix.slice().reverse();
}
function matrixFlipV(matrix) {
    return matrix.map(row => row.slice().reverse());
}
function matrixFlipD(matrix) {
    return matrix[0].map((val, index) => matrix.map(row => row[index]));
}
function matrixFlipAD(matrix) {
    return matrixFlipD(matrixFlipV(matrix));
}

function normalizeCoords(coords) {
    if (coords.length === 0) return [];
    const minX = Math.min(...coords.map(c => c[0]));
    const minY = Math.min(...coords.map(c => c[1]));
    return coords.map(c => [c[0] - minX, c[1] - minY]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
}

function coordsToString(coords) {
    return coords.map(c => c.join(',')).join(';');
}

function calculatePresentTransformationsCoords(presentDiagram) {
    const presentDiagram90 = matrixRot90CW(presentDiagram);
    const presentDiagram180 = matrixRot90CW(presentDiagram90);
    const presentDiagram270 = matrixRot90CW(presentDiagram180);

    const presentDiagramFH = matrixFlipH(presentDiagram);
    const presentDiagramFV = matrixFlipV(presentDiagram);
    const presentDiagramFD = matrixFlipD(presentDiagram);
    const presentDiagramFAD = matrixFlipAD(presentDiagram);

    const matrices = [
        presentDiagram,       // R0
        presentDiagram90,     // R90
        presentDiagram180,    // R180
        presentDiagram270,    // R270
        presentDiagramFH,     // FH
        presentDiagramFV,     // FV
        presentDiagramFD,     // FD
        presentDiagramFAD     // FAD
    ];

    const uniqueShapes = new Map();

    for (const m of matrices) {
        const coords = calculateDigramCoords(m);
        const normalized = normalizeCoords(coords);
        const key = coordsToString(normalized);
        if (!uniqueShapes.has(key)) {
            uniqueShapes.set(key, normalized);
        }
    }
    return Array.from(uniqueShapes.values());
}

function calculateDigramCoords(presentShape) {
    const coords = [];

    for (let presentY = 0; presentY < presentShape.length; presentY++) {
        for (let presentX = 0; presentX < presentShape[presentY].length; presentX++) {
            if (presentShape[presentY][presentX] == ".") continue;
            coords.push([presentX, presentY]);
        }
    }

    return coords;
}

const presentShapes = new Map();
let currentPresentIdx = -1;
let currentPresentDiagram = [];

const areas = [];

for (const line of lines) {
    if (line.includes(':') && !line.includes('x')) {
        currentPresentIdx = parseInt(line.split(':')[0]);
        continue;
    }

    if (line.trim().length == 0) {
        presentShapes.set(currentPresentIdx, calculatePresentTransformationsCoords(currentPresentDiagram));

        currentPresentIdx = -1;
        currentPresentDiagram = [];

        continue;
    }

    if (currentPresentIdx >= 0) {
        currentPresentDiagram.push(line.split(''));
        continue;
    }

    if (line.includes('x')) {
        areas.push(line);
        continue;
    }
}

const presentSizes = new Map();
for (const [id, shapes] of presentShapes) {
    if (shapes.length > 0) {
        presentSizes.set(id, shapes[0].length);
    } else {
        presentSizes.set(id, 0);
    }
}

function canPlaceAt(diagram, shape, x, y) {
    for (const [px, py] of shape) {
        if (diagram[y + py][x + px] === '#') return false;
    }
    return true;
}

function placeAt(diagram, shape, x, y) {
    for (const [px, py] of shape) {
        diagram[y + py][x + px] = '#';
    }
}

function removeAt(diagram, shape, x, y) {
    for (const [px, py] of shape) {
        diagram[y + py][x + px] = '.';
    }
}

function getConnectedComponents(diagram) {
    const height = diagram.length;
    const width = diagram[0].length;
    const visited = new Uint8Array(width * height);
    const components = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const startIdx = y * width + x;
            if (diagram[y][x] === '.' && visited[startIdx] === 0) {
                let size = 0;
                const stack = [startIdx];
                visited[startIdx] = 1;
                while (stack.length > 0) {
                    const curr = stack.pop();
                    const cx = curr % width;
                    const cy = Math.floor(curr / width);
                    size++;

                    // Right
                    if (cx + 1 < width) {
                        const nIdx = cy * width + (cx + 1);
                        if (diagram[cy][cx + 1] === '.' && visited[nIdx] === 0) {
                            visited[nIdx] = 1;
                            stack.push(nIdx);
                        }
                    }
                    // Left
                    if (cx - 1 >= 0) {
                        const nIdx = cy * width + (cx - 1);
                        if (diagram[cy][cx - 1] === '.' && visited[nIdx] === 0) {
                            visited[nIdx] = 1;
                            stack.push(nIdx);
                        }
                    }
                    // Down
                    if (cy + 1 < height) {
                        const nIdx = (cy + 1) * width + cx;
                        if (diagram[cy + 1][cx] === '.' && visited[nIdx] === 0) {
                            visited[nIdx] = 1;
                            stack.push(nIdx);
                        }
                    }
                    // Up
                    if (cy - 1 >= 0) {
                        const nIdx = (cy - 1) * width + cx;
                        if (diagram[cy - 1][cx] === '.' && visited[nIdx] === 0) {
                            visited[nIdx] = 1;
                            stack.push(nIdx);
                        }
                    }
                }
                components.push(size);
            }
        }
    }
    return components;
}

let memo = new Map();

function canPlacePresents(diagram, presentIds, prevId = -1, prevPos = -1) {
    const key = `${diagram.map(r => r.join('')).join('')}:${presentIds.length}:${(presentIds.length > 0 && presentIds[0] === prevId) ? prevPos : -1}`;
    if (memo.has(key)) return memo.get(key);

    if (presentIds.length === 0) return true;

    const currentId = presentIds[0];
    const remainingIds = presentIds.slice(1);

    const shapes = presentShapes.get(currentId);
    const height = diagram.length;
    const width = diagram[0].length;

    let startY = 0;
    let startX = 0;

    if (currentId === prevId) {
        startY = Math.floor(prevPos / width);
        startX = prevPos % width;
    }

    for (const shape of shapes) {
        const shapeWidth = Math.max(...shape.map(c => c[0])) + 1;
        const shapeHeight = Math.max(...shape.map(c => c[1])) + 1;

        for (let y = startY; y <= height - shapeHeight; y++) {
            const currentStartX = (y === startY) ? startX : 0;

            for (let x = currentStartX; x <= width - shapeWidth; x++) {
                if (canPlaceAt(diagram, shape, x, y)) {
                    placeAt(diagram, shape, x, y);

                    let possible = true;
                    if (remainingIds.length > 0) {
                        let minRemainingSize = Infinity;
                        let totalRemainingArea = 0;
                        for (const pid of remainingIds) {
                            const s = presentSizes.get(pid);
                            if (s < minRemainingSize) minRemainingSize = s;
                            totalRemainingArea += s;
                        }

                        const components = getConnectedComponents(diagram);
                        let validEmptyArea = 0;
                        for (const size of components) {
                            if (size >= minRemainingSize) {
                                validEmptyArea += size;
                            }
                        }

                        if (validEmptyArea < totalRemainingArea) {
                            possible = false;
                        }
                    }

                    if (possible && canPlacePresents(diagram, remainingIds, currentId, y * width + x)) {
                        memo.set(key, true);
                        return true;
                    }
                    removeAt(diagram, shape, x, y);
                }
            }
        }
    }

    memo.set(key, false);
    return false;
}

let validAreas = 0;
for (const area of areas) {
    memo.clear();
    const startTime = Date.now();
    console.log(area);
    const [size, presentAmountsStr] = area.split(': ');

    const [width, height] = size.split('x').map(Number);

    const diagram = [];
    for (let y = 0; y < height; y++) {
        diagram.push([]);
        for (let x = 0; x < width; x++) {
            diagram[y].push('.');
        }
    }

    const presentAmounts = presentAmountsStr.split(' ').map(Number);

    const presentIds = [];
    let totalPresentArea = 0;
    presentAmounts.forEach((count, id) => {
        for (let i = 0; i < count; i++) {
            presentIds.push(id);
            totalPresentArea += presentSizes.get(id);
        }
    });

    if (totalPresentArea > width * height) {
        continue;
    }

    presentIds.sort((a, b) => {
        const sizeDiff = presentSizes.get(b) - presentSizes.get(a);
        return sizeDiff !== 0 ? sizeDiff : a - b;
    });

    const isValid = canPlacePresents(diagram, presentIds);

    if (isValid) validAreas += 1;
    const endTime = Date.now();
    console.log(`Time taken: ${endTime - startTime}ms`);
}

console.log(validAreas);
