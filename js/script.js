// Original words array - will not be modified
const originalWords = [
  "Hello",
  "Code",
  "Programming",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Styling",
  "Cascade",
  "Function",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
  "Working",
  "Results",
  "Destructuring",
  "Paradigm",
  "Documentation",
  "Dependence",
];

// Game settings
const levels = { easy: 5, medium: 3, hard: 2 };

// Main Game
let currentWords = [];
let currentLevel = "medium"; // Default level
let timePerWord = levels[currentLevel];
let score = 0;
let isPlaying = false;
let timerInterval;

// DOM Elements
const levelChooser = document.querySelector(".choose-level");
const gameContainer = document.querySelector(".game");
const levelInputs = document.querySelectorAll(
  '.choose-level input[name="level"]'
);
const startButton = document.querySelector(".start");
const levelNameSpan = document.querySelector(".message .level");
const secondsSpan = document.querySelector(".message .seconds");
const theWord = document.querySelector(".the-word");
const input = document.querySelector(".input");
const upcomingWords = document.querySelector(".upcoming-words");
const timeLeftSpan = document.querySelector(".time span");
const scoreGot = document.querySelector(".score .got");
const scoreTotal = document.querySelector(".score .total");
const finishMessage = document.querySelector(".finish");

// Initialize the game state and listeners
function init() {
  // Set default level from checked radio button
  const checkedLevel = document.querySelector(
    '.levels input[name="level"]:checked'
  );
  currentLevel = checkedLevel.value;
  timePerWord = levels[currentLevel];

  // Hide game container initially
  gameContainer.style.display = "none";

  // Event Listeners
  levelInputs.forEach((input) => {
    input.addEventListener("change", setLevel);
  });
  startButton.addEventListener("click", startGame);
  input.addEventListener("input", handleInput);
  input.onpaste = () => false; // Disable paste
}

// Set difficulty level from radio buttons
function setLevel(e) {
  currentLevel = e.target.value;
  timePerWord = levels[currentLevel];
}

// Start the game
function startGame() {
  // Reset state
  currentWords = [...originalWords];
  score = 0;
  isPlaying = true;

  // Update UI for game start
  levelChooser.style.display = "none";
  gameContainer.style.display = "block";
  input.disabled = false;
  input.value = "";
  input.focus();
  scoreGot.textContent = "0";
  finishMessage.style.display = "none";
  theWord.style.display = "flex";
  upcomingWords.style.display = "flex";

  // Set message bar text
  levelNameSpan.textContent = currentLevel;
  secondsSpan.textContent = timePerWord;
  scoreTotal.textContent = originalWords.length;

  generateWord();
}

// Generate a new word
function generateWord() {
  const randomIndex = Math.floor(Math.random() * currentWords.length);
  const word = currentWords[randomIndex];
  currentWords.splice(randomIndex, 1);

  theWord.textContent = word;
  updateUpcomingWords();
  startTimer();
}

// Update the upcoming words display
function updateUpcomingWords() {
  upcomingWords.innerHTML = "";
  const wordsToShow = currentWords.slice(0, 3);
  wordsToShow.forEach((word) => {
    const div = document.createElement("div");
    div.textContent = word;
    upcomingWords.appendChild(div);
  });
}

// Handle user typing and check for correct word
function handleInput() {
  if (!isPlaying) return;

  if (input.value.toLowerCase() === theWord.textContent.toLowerCase()) {
    score++;
    scoreGot.textContent = score;
    input.value = "";
    clearInterval(timerInterval);

    if (currentWords.length > 0) {
      generateWord();
    } else {
      endGame(true); // All words typed correctly
    }
  }
}

// Start the countdown timer for a word
function startTimer() {
  let time = timePerWord;
  timeLeftSpan.textContent = time;

  timerInterval = setInterval(() => {
    time--;
    timeLeftSpan.textContent = time;
    if (time === 0) {
      clearInterval(timerInterval);
      endGame(false); // Time ran out
    }
  }, 1000);
}

// End the game and show final message
function endGame(isWinner) {
  isPlaying = false;
  clearInterval(timerInterval);

  input.disabled = true;
  theWord.style.display = "none";
  upcomingWords.style.display = "none";
  finishMessage.style.display = "block";
  finishMessage.innerHTML = "";

  const resultSpan = document.createElement("span");
  resultSpan.className = isWinner ? "good" : "bad";
  resultSpan.textContent = isWinner ? "Congratulations! You Won!" : "Game Over";
  finishMessage.appendChild(resultSpan);

  const replayBtn = document.createElement("button");
  replayBtn.textContent = "Retry";
  replayBtn.className = "replay";
  replayBtn.onclick = () => window.location.reload();
  finishMessage.appendChild(replayBtn);
}

// Kickstart the application
init();
