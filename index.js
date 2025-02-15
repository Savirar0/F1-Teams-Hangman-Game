let container = document.querySelector(".container");
let keyboardBox = container.querySelector(".keyboard-box");
let wordSpotlight = container.querySelector(".guess-word .wordSpotLight");
let wrongGuessTxt = container.querySelector(".wrong-guess");
let maxWrongTxt = container.querySelector(".max-wrong");
let resultBox = container.querySelector(".result-box");
let gameBox = container.querySelector(".game-box");
let message = container.querySelector(".result-box .message");
let result_box_answer = container.querySelector(".result-box .result-answer");
let reset = container.querySelector(".reset-btn");
let newGamebtn = container.querySelector(".result-box .new-game-btn");

const teams = [
    'REDBULL',
    'MCLAREN',
    'ASTONMARTIN',
    'MERCEDES',
    'FERRARI',
    'ALPINE',
    'WILLAMS',
    'HAAS',
    'RB',
    'KICKSAUBER'
];

let answer = "";
let wordStatus = null;
let guessed = [];
let wrongGuess = 0;
let maxWrong = 6;

let generateButtons = () => {
    keyboardBox.innerHTML = "";
    let buttonWord = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(letter =>
        `<button
            class="keyboard-btn"
            id="${letter}" onclick="Guess('${letter}')">
            ${letter}
        </button>`
    ).join('');

    keyboardBox.innerHTML = buttonWord;
    maxWrongTxt.innerHTML = maxWrong;
};

let generateRandomwords = () => {
    answer = teams[Math.floor(Math.random() * teams.length)];
    console.log(answer);
};

let wordGuess = () => {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_")).join(' ');

    wordSpotlight.innerHTML = wordStatus;
    if (!wordStatus.includes("_")) {
        alert("You won!");
    }
};

let Guess = (choosenLetter) => {
    if (guessed.indexOf(choosenLetter) === -1) {
        guessed.push(choosenLetter);
    }
    let button = document.getElementById(choosenLetter);
    button.disabled = true;
    button.style.backgroundColor = "#F5F5F5";
    button.style.border = "1px solid #808080";
    button.style.color = "#808080";

    if (answer.includes(choosenLetter)) {
        wordGuess();
        GameWon();
    } else {
        wrongGuess++;
        updateWrongGuess();
        hangmanUpdate();
        GameLost();
    }
};

let updateWrongGuess = () => {
    wrongGuessTxt.innerHTML = wrongGuess;
};

let hangmanUpdate = () => {
    switch (wrongGuess) { 
        case 1:
            document.querySelector(".face").style.display = "block";
            break;
        case 2:
            document.querySelector(".stomach").style.display = "block";
            break;
        case 3:
            document.querySelector(".hand-one").style.display = "block";
            break;
        case 4:
            document.querySelector(".hand-two").style.display = "block";
            break;
        case 5:
            document.querySelector("#leg-one").style.display = "block";
            break;
        case 6:
            document.querySelector("#leg-two").style.display = "block";
            break;
    }
};

let GameWon = () => {
    if (wordStatus === answer) {
        resultBox.style.display = "block";
        gameBox.style.display = "none";
        message.innerHTML = "You win!!";
        message.style.color = "#90ee90";
        result_box_answer.innerHTML = answer;
    }
};

let GameLost = () => {
    if (wrongGuess === maxWrong) {
        resultBox.style.display = "block";
        gameBox.style.display = "none";
        message.innerHTML = "You lost! Noob fr!"; 
        message.style.color = "#f08080";
        result_box_answer.innerHTML = answer;
    }
};

let resetGame = () => {
    wrongGuess = 0
    guessed = [];
    generateRandomwords();
    wordGuess();
    updateWrongGuess();
    hangmanUpdate();
    generateButtons();

    
    document.querySelector(".face").style.display = "none";
    document.querySelector(".stomach").style.display = "none";
    document.querySelector(".hand-one").style.display = "none";
    document.querySelector(".hand-two").style.display = "none";
    document.querySelector("#leg-one").style.display = "none";
    document.querySelector("#leg-two").style.display = "none";

    
    const buttons = document.querySelectorAll(".keyboard-btn");
    buttons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = "";
        button.style.border = "";
        button.style.color = "";
    });
};

let newGame = () => {
    resultBox.style.display = "none";
    gameBox.style.display = "block";
    resetGame();
};


reset.addEventListener("click", resetGame);
newGamebtn.addEventListener("click", newGame);


generateButtons();
generateRandomwords();
wordGuess();
