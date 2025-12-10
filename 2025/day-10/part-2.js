const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const machines = input.trim().split('\n').map(line => line.split(' '));

function solveMachine(requiredJoltage, buttons) {
    const numEqs = requiredJoltage.length;
    const numVars = buttons.length;

    // Calculate upper bounds for each variable
    const varBounds = buttons.map((btnIndices) => {
        let min = Infinity;
        let affectsSomething = false;
        for (const idx of btnIndices) {
            if (idx < numEqs) {
                min = Math.min(min, requiredJoltage[idx]);
                affectsSomething = true;
            }
        }
        return affectsSomething ? min : 0;
    });

    // Matrix A and Vector b
    const A = Array(numEqs).fill(0).map(() => Array(numVars).fill(0));
    const b = [...requiredJoltage];

    for (let j = 0; j < numVars; j++) {
        const btnIndices = buttons[j];
        for (const idx of btnIndices) {
            if (idx < numEqs) {
                A[idx][j] = 1;
            }
        }
    }

    // Gaussian Elimination (thank you Wikipedia 🙏 https://en.wikipedia.org/wiki/Gaussian_elimination)
    let pivotRow = 0;
    const pivotCols = [];
    const freeCols = [];
    const colToPivotRow = {};

    for (let j = 0; j < numVars && pivotRow < numEqs; j++) {
        let sel = -1;
        for (let i = pivotRow; i < numEqs; i++) {
            if (Math.abs(A[i][j]) > 1e-9) {
                sel = i;
                break;
            }
        }

        if (sel === -1) {
            freeCols.push(j);
            continue;
        }

        // Swap rows
        [A[pivotRow], A[sel]] = [A[sel], A[pivotRow]];
        [b[pivotRow], b[sel]] = [b[sel], b[pivotRow]];

        // Normalize
        const pivotVal = A[pivotRow][j];
        for (let k = j; k < numVars; k++) {
            A[pivotRow][k] /= pivotVal;
        }
        b[pivotRow] /= pivotVal;

        // Eliminate
        for (let i = 0; i < numEqs; i++) {
            if (i !== pivotRow) {
                const factor = A[i][j];
                if (Math.abs(factor) > 1e-9) {
                    for (let k = j; k < numVars; k++) {
                        A[i][k] -= factor * A[pivotRow][k];
                    }
                    b[i] -= factor * b[pivotRow];
                }
            }
        }

        pivotCols.push(j);
        colToPivotRow[j] = pivotRow;
        pivotRow++;
    }

    for (let j = 0; j < numVars; j++) {
        if (!pivotCols.includes(j) && !freeCols.includes(j)) {
            freeCols.push(j);
        }
    }

    for (let i = pivotRow; i < numEqs; i++) {
        if (Math.abs(b[i]) > 1e-9) {
            return -1;
        }
    }

    let minTotalPresses = Infinity;
    const freeValues = {};

    function search(freeIdx) {
        if (freeIdx === freeCols.length) {
            let currentPresses = 0;
            const x = Array(numVars).fill(0);

            for (const fCol of freeCols) {
                x[fCol] = freeValues[fCol];
                currentPresses += x[fCol];
            }

            for (let i = 0; i < pivotCols.length; i++) {
                const pCol = pivotCols[i];
                const row = colToPivotRow[pCol];
                let val = b[row];
                for (const fCol of freeCols) {
                    val -= A[row][fCol] * x[fCol];
                }

                if (val < -1e-9 || Math.abs(val - Math.round(val)) > 1e-9) {
                    return;
                }
                const intVal = Math.round(val);
                if (intVal < 0) return;

                if (intVal > varBounds[pCol]) return;

                x[pCol] = intVal;
                currentPresses += intVal;
            }

            if (currentPresses < minTotalPresses) {
                minTotalPresses = currentPresses;
            }
            return;
        }

        const col = freeCols[freeIdx];
        const limit = varBounds[col];

        for (let val = 0; val <= limit; val++) {
            freeValues[col] = val;
            search(freeIdx + 1);
        }
    }

    search(0);

    return minTotalPresses === Infinity ? -1 : minTotalPresses;
}

let totalPresses = 0;
for (let i = 0; i < machines.length; i++) {
    const machine = machines[i];
    if (machine.length < 2) continue;

    const joltageDiagram = machine[machine.length - 1];
    const requiredJoltage = joltageDiagram
        .slice(1, -1)
        .split(',')
        .map(Number);

    const buttons = machine
        .slice(1, -1)
        .map(b => b.slice(1, -1).split(',').map(Number));

    const fewestPresses = solveMachine(requiredJoltage, buttons);
    if (fewestPresses !== -1) {
        totalPresses += fewestPresses;
    }
}

console.log(totalPresses);