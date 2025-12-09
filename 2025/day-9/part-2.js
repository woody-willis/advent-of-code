const fs = require('fs');
const classifyPoint = require("robust-point-in-polygon");
const input = fs.readFileSync('input.txt', 'utf-8');

const polygon = input.split('\n').filter(line => line.trim() !== '').map(line => line.split(',').map(Number));

function segmentIntersectsRect(p1, p2, minX, maxX, minY, maxY) {
    if ((p1[0] > minX && p1[0] < maxX && p1[1] > minY && p1[1] < maxY) ||
        (p2[0] > minX && p2[0] < maxX && p2[1] > minY && p2[1] < maxY)) {
        return true;
    }

    const midX = (p1[0] + p2[0]) / 2;
    const midY = (p1[1] + p2[1]) / 2;
    if (midX > minX && midX < maxX && midY > minY && midY < maxY) {
        return true;
    }

    function intersectVertical(x) {
        if ((p1[0] < x && p2[0] < x) || (p1[0] > x && p2[0] > x)) return null;
        if (p1[0] === p2[0]) return null;
        const t = (x - p1[0]) / (p2[0] - p1[0]);
        const y = p1[1] + t * (p2[1] - p1[1]);
        return y;
    }

    function intersectHorizontal(y) {
        if ((p1[1] < y && p2[1] < y) || (p1[1] > y && p2[1] > y)) return null;
        if (p1[1] === p2[1]) return null;
        const t = (y - p1[1]) / (p2[1] - p1[1]);
        const x = p1[0] + t * (p2[0] - p1[0]);
        return x;
    }

    let y = intersectVertical(minX);
    if (y !== null && y > minY && y < maxY) return true;

    y = intersectVertical(maxX);
    if (y !== null && y > minY && y < maxY) return true;

    let x = intersectHorizontal(minY);
    if (x !== null && x > minX && x < maxX) return true;

    x = intersectHorizontal(maxY);
    if (x !== null && x > minX && x < maxX) return true;

    return false;
}

let largetArea = -1;
for (let i = 0; i < polygon.length; i++) {
    const [aX, aY] = polygon[i];
    for (let j = 0; j < polygon.length; j++) {
        const [bX, bY] = polygon[j];
        if (aX == bX && aY == bY) continue;

        const minY = Math.min(aY, bY);
        const maxY = Math.max(aY, bY);
        const minX = Math.min(aX, bX);
        const maxX = Math.max(aX, bX);

        const width = maxX - minX + 1;
        const height = maxY - minY + 1;
        const area = width * height;

        if (area <= largetArea) continue;

        const [midX, midY] = [Math.round(aX + Math.abs(bX - aX) / 2), Math.round(aY + Math.abs(bY - aY) / 2)]
        if (classifyPoint(polygon, [midX, midY]) < 0) continue;

        let isValid = true;

        for (let k = 0; k < polygon.length; k++) {
            const [pX, pY] = polygon[k];
            if (pX > minX && pX < maxX && pY > minY && pY < maxY) {
                isValid = false;
                break;
            }
        }
        if (!isValid) continue;

        for (let k = 0; k < polygon.length; k++) {
            const p1 = polygon[k];
            const p2 = polygon[(k + 1) % polygon.length];
            if (segmentIntersectsRect(p1, p2, minX, maxX, minY, maxY)) {
                isValid = false;
                break;
            }
        }
        if (!isValid) continue;

        if (area > largetArea) largetArea = area;
    }
}

console.log(largetArea);