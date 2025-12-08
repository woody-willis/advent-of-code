const fs = require('fs');
const input = fs.readFileSync('input-e.txt', 'utf-8');

const lines = input.split('\n');

let total = 0;

let currentButtonA;
let currentButtonB;
let prizeLocation;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('Button A:')) {
        currentButtonA = line.split('Button A: ')[1].split(', ').map(coords => parseInt(coords.split('+')[1]));
        continue;
    } else if (line.startsWith('Button B:')) {
        currentButtonB = line.split('Button B: ')[1].split(', ').map(coords => parseInt(coords.split('+')[1]));
        continue;
    } else if (line.startsWith('Prize:')) {
        prizeLocation = line.split('Prize: ')[1].split(', ').map(coords => parseInt(coords.split('=')[1]));
        continue;
    }

    const loopAmount = 100;
    let cheapestAmount = Infinity;
    for (let j = 0; j <= loopAmount; j++) {
        for (let k = 0; k <= loopAmount; k++) {
            const buttonAPressAmount = [currentButtonA[0] * j, currentButtonA[1] * j];
            const buttonBPressAmount = [currentButtonB[0] * k, currentButtonB[1] * k];
            const totalPressedLocation = [buttonAPressAmount[0] + buttonBPressAmount[0], buttonAPressAmount[1] + buttonBPressAmount[1]];

            if (totalPressedLocation[0] === prizeLocation[0] && totalPressedLocation[1] === prizeLocation[1]) {
                const tokenCost = j * 3 + k;
                if (tokenCost < cheapestAmount) {
                    cheapestAmount = tokenCost;
                }

                break;
            }
        }
    }

    if (cheapestAmount !== Infinity) {
        total += cheapestAmount;
    }
}

console.log(total);