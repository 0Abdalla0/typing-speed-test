const words = [
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

// Setting levels
const levels = {
  "easy": 5,
  "medium": 3,
  "hard": 2,
};

// Default
let DefaultLevelName = "medium";
let DefaultLevelSeconds = levels[DefaultLevelName];

let startButton = document.querySelector(".start");
let levelNamespan = document.querySelector(".message .level")
let secondsspan = document.querySelector(".message .seconds")
let theWord = document.querySelector(".the-word");
let input=document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let upcomingWords = document.querySelector(".upcoming-words");


// Setting level 
levelNamespan.innerHTML = DefaultLevelName;
secondsspan.innerHTML = DefaultLevelSeconds;
timeLeftSpan.innerHTML = DefaultLevelSeconds;
scoreTotal.innerHTML = words.length;
// Disable paste Event
input.onpaste = () => false
startButton.onclick = () => {
    startButton.remove();
    input.focus();
    generateWords();
}
// generate word function
function generateWords() {
    let randomWord = words[Math.floor(Math.random() * words.length)]
    // get word Index
    let wordIndex = words.indexOf(randomWord)
    words.splice(wordIndex, 1)
    theWord.innerHTML = randomWord
    // Empty Upcoming Words
    upcomingWords.innerHTML = ""
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div")
        let txt = document.createTextNode(words[i])
        div.appendChild(txt)
        upcomingWords.appendChild(div)
    }

    startPlay()
}
// Start Play
function startPlay() {
    timeLeftSpan.innerHTML = DefaultLevelSeconds;
    let start = setInterval(() => {
        if (timeLeftSpan.innerHTML > 0) {
            timeLeftSpan.innerHTML--;
        } else {
            clearInterval(start)
            timeUp()
        }
    },1000)
}
function timeUp() {
    // Compare Words
    if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = ""
        scoreGot.innerHTML++;
        if (words.length > 0) {
            generateWords()
            startPlay()
        } else {
            let span = document.createElement("span");
            span.className = "good";
            let txt = document.createTextNode("Absolutely Perfect!");
            span.appendChild(txt);
            finishMessage.appendChild(span);
            finishMessage.style.display = "block"
            input.remove()
            upcomingWords.remove()
            theWord.remove()
        }
    } else {
        let span = document.createElement("span")
        span.className = "bad"
        let txt = document.createTextNode("Game Over")
        span.appendChild(txt)
        finishMessage.appendChild(span)
        input.remove()
        upcomingWords.remove()
        theWord.remove()
        finishMessage.style.display = "block"
    }
}