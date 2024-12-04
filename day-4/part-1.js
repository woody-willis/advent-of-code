const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const wordsearch = input.split('\n');

const word = 'XMAS';

let total = 0;

for (let i = 0; i < wordsearch.length; i++) {
    for (let j = 0; j < wordsearch[i].length; j++) {
        if (wordsearch[i][j] !== word[0]) continue;

        // Diagonal down-right
        if (i + word.length <= wordsearch.length && j + word.length <= wordsearch[i].length) {
            let found = true;
            for (let k = 1; k < word.length; k++) {
                if (wordsearch[i + k][j + k] !== word[k]) {
                    found = false;
                    break;
                }
            }
            if (found) total++;
        }

        // Diagonal down-left
        if (i + word.length <= wordsearch.length && j - word.length+1 >= 0) {
            let found = true;
            for (let k = 1; k < word.length; k++) {
                if (wordsearch[i + k][j - k] !== word[k]) {
                    found = false;
                    break;
                }
            }
            if (found) total++;
        }

        // Diagonal up-right
        if (i - word.length+1 >= 0 && j + word.length <= wordsearch[i].length) {
            let found = true;
            for (let k = 1; k < word.length; k++) {
                if (wordsearch[i - k][j + k] !== word[k]) {
                    found = false;
                    break;
                }
            }
            if (found) total++;
        }

        // Diagonal up-left
        if (i - word.length+1 >= 0 && j - word.length+1 >= 0) {
            let found = true;
            for (let k = 1; k < word.length; k++) {
                if (wordsearch[i - k][j - k] !== word[k]) {
                    found = false;
                    break;
                }
            }
            if (found) total++;
        }

        // Vertical up
        if (i - word.length+1 >= 0) {
            let found = true;
            for (let k = 1; k < word.length; k++) {
                if (wordsearch[i - k][j] !== word[k]) {
                    found = false;
                    break;
                }
            }
            if (found) total++;
        }

        // Vertical down
        if (i + word.length <= wordsearch.length) {
            let found = true;
            for (let k = 1; k < word.length; k++) {
                if (wordsearch[i + k][j] !== word[k]) {
                    found = false;
                    break;
                }
            }
            if (found) total++;
        }

        // Horizontal left
        if (j - word.length+1 >= 0) {
            let found = true;
            for (let k = 1; k < word.length; k++) {
                if (wordsearch[i][j - k] !== word[k]) {
                    found = false;
                    break;
                }
            }
            if (found) total++;
        }

        // Horizontal right
        if (j + word.length <= wordsearch[i].length) {
            let found = true;
            for (let k = 1; k < word.length; k++) {
                if (wordsearch[i][j + k] !== word[k]) {
                    found = false;
                    break;
                }
            }
            if (found) total++;
        }
    }
}

console.log(total);