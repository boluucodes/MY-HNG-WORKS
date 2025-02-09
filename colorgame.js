let numSquares = 6;
let colors = [];
let pickedColor;
let score = 0; // Score counter

const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const easyBtn = document.querySelector("#easyButton");
const hardBtn = document.querySelector("#hardButton");
const colorPreview = document.querySelector("#colorPreview"); // Color preview box
const scoreDisplay = document.querySelector("#score"); // Score counter


function setupModeButtons() {
    easyBtn.addEventListener("click", function () {
        hardBtn.classList.remove("selected");
        easyBtn.classList.add("selected");
        numSquares = 3;
        resetGame();
    });

    hardBtn.addEventListener("click", function () {
        easyBtn.classList.remove("selected");
        hardBtn.classList.add("selected");
        numSquares = 6;
        resetGame();
    });
}

function setupSquares() {
    squares.forEach((square) => {
        square.addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
                score++;
                updateScore();

                // I Added this to Auto-reset game after 2 seconds - get rid of the play again in the html
                setTimeout(resetGame, 2000);
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    });
}

function resetGame() {
    colors = generateRandomColors(numSquares);
    pickedColor = randomColorG();
    colorDisplay.textContent = pickedColor;
    colorPreview.style.backgroundColor = pickedColor; // I added the preview box
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    h1.style.background = "steelblue";

    squares.forEach((square, index) => {
        if (colors[index]) {
            square.style.display = "block";
            square.style.backgroundColor = colors[index];
        } else {
            square.style.display = "none";
        }
    });
}

resetButton.addEventListener("click", resetGame);

function changeColors(color) {
    squares.forEach((square) => {
        square.style.background = color;
        square.style.transition = "background 0.6s ease-in-out";
    });
}

function randomColorG() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
    return Array.from({ length: num }, randomColor);
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function init() {
    setupModeButtons();
    setupSquares();
    resetGame();
}
init(); // To Initialize the game - no be british accent 

// battery wan die