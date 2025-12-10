const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const machines = input.split('\n').map(line => line.split(' '));

// breadth first seach
function getFewestPresses(requiredLights, buttons) {
    const targetState = JSON.stringify(requiredLights);
    const startLights = requiredLights.map(() => false);

    if (JSON.stringify(startLights) === targetState) return 0;

    const queue = [{ lights: startLights, depth: 0 }];

    const visited = new Set();
    visited.add(JSON.stringify(startLights));

    while (queue.length > 0) {
        const { lights, depth } = queue.shift();

        for (let i = 0; i < buttons.length; i++) {
            const nextLights = toggleDiagram([...lights], buttons[i]);
            const nextStateStr = JSON.stringify(nextLights);

            if (nextStateStr === targetState) {
                return depth + 1;
            }

            if (!visited.has(nextStateStr)) {
                visited.add(nextStateStr);
                queue.push({ lights: nextLights, depth: depth + 1 });
            }
        }
    }

    return -1;
}

function toggleDiagram(diagram, button) {
    for (const idx of button) {
        if (idx < diagram.length) {
            diagram[idx] = !diagram[idx];
        }
    }

    return diagram;
}

let totalPresses = 0;
for (let i = 0; i < machines.length; i++) {
    const machine = machines[i];

    const requiredLightsDiagram = machine[0];
    const requiredLights = requiredLightsDiagram
        .split('')
        .slice(1, -1)
        .map(l => l == "#" ? true : false);

    const buttons = machine
        .slice(1, -1)
        .map(b => b.slice(1, -1).split(',').map(Number));

    const fewestPresses = getFewestPresses(requiredLights, buttons);
    totalPresses += fewestPresses;
}

console.log(totalPresses);