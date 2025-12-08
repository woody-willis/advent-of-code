const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

class Robot {
    constructor(
        velocityX = 0,
        velocityY = 0,
    ) {
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }
}

const mapSizeX = 101;
const mapSizeY = 103;

let map = [];
for (let i = 0; i < mapSizeY; i++) {
    const row = [];
    for (let j = 0; j < mapSizeX; j++) {
        row.push([]);
    }
    map.push(row);
}

for (const line of lines) {
    const data = line.split(' ');

    const position = data[0].split('=')[1].split(',').map(Number);
    const velocity = data[1].split('=')[1].split(',').map(Number);

    const robot = new Robot(velocity[0], velocity[1]);

    map[position[1]][position[0]].push(robot);
}

console.log(map.map(row => row.map(cell => cell.length).join('')).join('\n').replace(/0/g, '.'));
console.log();

const seconds = 100;

for (let i = 0; i < seconds; i++) {
    const newMap = [];
    for (let i = 0; i < mapSizeY; i++) {
        const row = [];
        for (let j = 0; j < mapSizeX; j++) {
            row.push([]);
        }
        newMap.push(row);
    }

    for (let y = 0; y < mapSizeY; y++) {
        for (let x = 0; x < mapSizeX; x++) {
            const robots = map[y][x];
            
            for (const robot of robots) {
                let newX = x + robot.velocityX;
                let newY = y + robot.velocityY;

                if (newX < 0) {
                    newX += mapSizeX;
                } else if (newX >= mapSizeX) {
                    newX -= mapSizeX;
                }

                if (newY < 0) {
                    newY += mapSizeY;
                } else if (newY >= mapSizeY) {
                    newY -= mapSizeY;
                }

                newMap[newY][newX].push(robot);
            }
        }
    }

    map = newMap.slice();
    newMap.length = 0;
}

console.log(map.map(row => row.map(cell => cell.length).join('')).join('\n').replace(/0/g, '.'));

let quandrant1RobotAmount = 0;
let quandrant2RobotAmount = 0;
let quandrant3RobotAmount = 0;
let quandrant4RobotAmount = 0;

for (let y = 0; y < mapSizeY; y++) {
    for (let x = 0; x < mapSizeX; x++) {
        const robots = map[y][x];

        if (x < Math.floor(mapSizeX / 2) && y < Math.floor(mapSizeY / 2)) {
            quandrant1RobotAmount += robots.length;
        } else if (x >= Math.ceil(mapSizeX / 2) && y < Math.ceil(mapSizeY / 2)) {
            quandrant2RobotAmount += robots.length;
        } else if (x < Math.floor(mapSizeX / 2) && y >= Math.ceil(mapSizeY / 2)) {
            quandrant3RobotAmount += robots.length;
        } else if (x >= Math.ceil(mapSizeX / 2) && y >= Math.ceil(mapSizeY / 2)) {
            quandrant4RobotAmount += robots.length;
        }
    }
}

const safetyFactor = quandrant1RobotAmount * quandrant2RobotAmount * quandrant3RobotAmount * quandrant4RobotAmount;

console.log(quandrant1RobotAmount, quandrant2RobotAmount, quandrant3RobotAmount, quandrant4RobotAmount);
console.log(safetyFactor);