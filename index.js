let computerNumber = Math.floor(Math.random() * 10) + 1;
console.log(computerNumber);
let result = "";
let text = [];
let guessTime = 3;

document.getElementById("guessTime").innerHTML = guessTime;

let time = 30; // time start from 0
let myTime; // timer will be assign to this variable

function timecounting() {
  myTime = setInterval(() => {
    time -= 1;
    document.getElementById("timecount").innerHTML = time;
    if (time == 0) {
      clearInterval(myTime);
      document.getElementById("alert").innerHTML = "You are DEAD!";
      document.getElementById("actionGuess").disabled = true;
      document.getElementById("reset").style = "display:visible";
      document.getElementById("alert").innerHTML = "";
    }
  }, 1000);
  // every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
}
timecounting(); // fire the timecounting function!!

// user only have 3 chances
function reduceGuessTime() {
  if (guessTime > 0) {
    guessTime = guessTime - 1;
    document.getElementById("guessTime").innerHTML = guessTime;
  } else {
    clearInterval(myTime);
    document.getElementById("alert").innerHTML = "You're out of guess!";
    document.getElementById("actionGuess").disabled = true;
    document.getElementById("reset").style = "display:visible";
  }
}

let round;
let score;

let scoreHistory = [];

function updateDashBoard() {
  let historyBoard = "";
  for (let i = 0; i < scoreHistory.length; i++) {
    historyBoard += `<li>Round ${i + 1} : ${scoreHistory[i]}s</li>`;
    document.getElementById("dashBoard").innerHTML = historyBoard;
  }
}

function updateHighScore() {
  let max = 99;
  for (let i = 0; i < scoreHistory.length; i++) {
    if (max >= scoreHistory[i]) {
      max = scoreHistory[i];
      document.getElementById("highScore").innerHTML = `${max}s`;
    }
  }
}

function guess() {
  let userNumber = document.getElementById("userInput").value;
  round++;
  if (text.includes(userNumber)) {
    if (guessTime > 0) {
      result = "You've guessed this number before";
      document.getElementById("resultArea").innerHTML = result;
    } else {
      clearInterval(myTime);
      document.getElementById("alert").innerHTML = "You're out of guess!";
      document.getElementById("actionGuess").disabled = true;
      document.getElementById("reset").style = "display:visible";
    }
  } else {
    if (userNumber >= 0 && userNumber <= 10) {
      reduceGuessTime();
      if (text.length <= 3) {
        if (computerNumber < userNumber) {
          result = "HINT: try smaller number";
          document.getElementById("resultArea").innerHTML = result;
        } else if (computerNumber > userNumber) {
          result = "HINT: try bigger number";
          document.getElementById("resultArea").innerHTML = result;
        } else if (computerNumber == userNumber) {
          result = "Correct";
          clearInterval(myTime);
          score = 30 - time;
          scoreHistory.push(score);
          updateDashBoard();
          updateHighScore();
          document.getElementById("resultArea").innerHTML = result;
          document.getElementById("alert").innerHTML =
            "You won! lucky bastard :)";
          document.getElementById("actionGuess").disabled = true;
          document.getElementById("reset").style = "display:visible";
        }

        text.push(userNumber);
        text.splice(3, 1);
        document.getElementById("guessHistory").innerHTML = text;
      } else {
        clearInterval(myTime);
        document.getElementById("alert").innerHTML = "You're out of guess!";
        document.getElementById("actionGuess").disabled = true;
        document.getElementById("reset").style = "display:visible";
      }
    } else {
      document.getElementById("resultArea").innerHTML =
        "Please choose number from 0-10 only";
    }
  }
}

function resetGame() {
  computerNumber = Math.floor(Math.random() * 10) + 1;
  console.log(computerNumber);
  time = 30;
  document.getElementById("timecount").innerHTML = time;
  timecounting();
  document.getElementById("actionGuess").disabled = false;
  document.getElementById("reset").style = "display:none";
  guessTime = 3;
  document.getElementById("guessTime").innerHTML = guessTime;
  document.getElementById("resultArea").innerHTML = "";
  text = [];
  document.getElementById("guessHistory").innerHTML = text;
  document.getElementById("alert").innerHTML = "";
}

// array chua aobject
// object chua round and score
// khi result = correct, add round and time
