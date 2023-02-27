// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

const puzzleWords = ["python", "java", "swift", "javascript"];

function rand(arr) {
    return Math.floor(Math.random() * arr.length);
}

function rightInput(gL, mW) {
    while (!((/^[a-z]$/).test(gL))) {
        if ((/[^a-z]/.test(gL)) || /[A-Z]/.test(gL)) {
            console.log("Please, enter a lowercase letter from the English alphabet.");
        } else {
            if ((/\w+/.test(gL)) || (/[a-z]*/.test(gL))) {
                console.log("Please, input a single letter.\n");
            }
        }
        console.log();
        console.log(String(mW).replace(/,/g, ""));
        console.log(`Input a letter: `);
        gL = input();
    }
    return gL;
}
function check(letter,str, mW) {
    letter = rightInput(letter, mW);
    if (str.search(letter) !== -1) {
        while (str.search(letter) !== -1) {
            console.log("You've already guessed this letter.");
            console.log();
            console.log(String(mW).replace(/,/g, ""));
            console.log(`Input a letter: `);
            letter = input();
            letter = rightInput(letter, mW);
        }
    }
    return letter;
}

let guessedLetter;
let winCount = 0;
let loseCount = 0;
let playerAnswer;

console.log("H A N G M A N")
while (playerAnswer !== "exit") {
    console.log("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
    playerAnswer = input();
    if (playerAnswer === "play") {
        let i = 8;
        let puzzledWord = puzzleWords[rand(puzzleWords)];
        let puzzledLetters = puzzledWord.split("")
        let hyphenPuzzledWord = Array(puzzledWord.length).fill('-');
        let checkLetters = "-";
        while (i > 0) {
            console.log();
            console.log(`${String(hyphenPuzzledWord).replace(/,/g, "")}`);
            console.log(`Input a letter: `);
            guessedLetter = input();
            guessedLetter = (check(guessedLetter, checkLetters, hyphenPuzzledWord));

            checkLetters = checkLetters + guessedLetter;

            if (puzzledLetters.some((pzWord) => pzWord === guessedLetter)) {
                for (let x in puzzledLetters) {
                    if ((guessedLetter === puzzledLetters[x]) && (guessedLetter !== hyphenPuzzledWord[x])) {
                        hyphenPuzzledWord[x] = guessedLetter;
                    }
                }
            } else {
                console.log(`That letter doesn't appear in the word.`);
                i--;
            }

            if (!(/-/.test(String(hyphenPuzzledWord).replace(/,/g, ""))) && i !== 0) {
                i = 0;
                console.log(`You guessed the word ${String(hyphenPuzzledWord).replace(/,/g, "")}!`);
                console.log("You survived!");
                winCount++;
            } else {
                if (i === 0) {
                    console.log("You lost!");
                    loseCount++;
                }
            }
        }
    }
    if (playerAnswer === "results") {
        console.log(`You won: ${winCount} times.`);
        console.log(`You lost: ${loseCount} times.`);
    }
}
