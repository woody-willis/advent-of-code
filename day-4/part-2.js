const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const wordsearch = input.split('\n');

let total = 0;

for (let i = 0; i < wordsearch.length; i++) {
    for (let j = 0; j < wordsearch[i].length; j++) {
        if (wordsearch[i][j] !== 'A') continue;
        if (i-1 < 0 || j-1 < 0) continue;
        if (i+1 >= wordsearch.length || j+1 >= wordsearch[i].length) continue;

        let diag1 = false;
        if (wordsearch[i-1][j-1] === 'M' && wordsearch[i+1][j+1] === 'S') {
            diag1 = true;
        } else if (wordsearch[i-1][j-1] === 'S' && wordsearch[i+1][j+1] === 'M') {
            diag1 = true;
        }
        
        let diag2 = false;
        if (wordsearch[i-1][j+1] === 'M' && wordsearch[i+1][j-1] === 'S') {
            diag2 = true;
        } else if (wordsearch[i-1][j+1] === 'S' && wordsearch[i+1][j-1] === 'M') {
            diag2 = true;
        }

        if (diag1 && diag2) {
            total++;
        }
    }
}

console.log(total);