const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

const deviceOutputs = new Map();

for (const line of lines) {
    const [device, outputs] = line.split(': ');
    deviceOutputs.set(device, outputs.split(' '));
}

const memo = new Map();
function getTotalPaths(a, b) {
    memo.clear();
    return countPaths(a, b);
}
function countPaths(a, b) {
    if (a == b) {
        return 1;
    }

    if (memo.has(a)) {
        return memo.get(a);
    }

    let total = 0;
    const nextNodes = deviceOutputs.get(a);

    if (nextNodes) {
        for (const node of nextNodes) {
            if (node === 'out' && b !== 'out') continue;
            total += countPaths(node, b);
        }
    }

    memo.set(a, total);

    return total;
}

const svrDacPaths = getTotalPaths('svr', 'dac'); console.log('SVR -> DAC');
const dacFftPaths = getTotalPaths('dac', 'fft'); console.log('DAC -> FFT');
const fftOutPaths = getTotalPaths('fft', 'out'); console.log('FFT -> OUT');
const pathTotal1 = svrDacPaths * dacFftPaths * fftOutPaths;

const svrFftPaths = getTotalPaths('svr', 'fft'); console.log('SVR -> FFT');
const fftDacPaths = getTotalPaths('fft', 'dac'); console.log('FFT -> DAC');
const dacOutPaths = getTotalPaths('dac', 'out'); console.log('DAC -> OUT');
const pathTotal2 = svrFftPaths * fftDacPaths * dacOutPaths;

const totalPaths = pathTotal1 + pathTotal2;

console.log(totalPaths);