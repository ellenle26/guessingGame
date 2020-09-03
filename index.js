let computerNumber = Math.floor(Math.random() * 10) + 1;

console.log(computerNumber);

let result = "";
let text = [];
let guessTime = 3;

document.getElementById("guessTime").innerHTML = guessTime;

let time = 30; // time start from 0
let myTime; // timer will be assign to this variable

function timesOut() {
  clearInterval(myTime);
  alert("TIMES OUT");
  document.getElementById("actionGuess").disabled = true;
  document.getElementById("reset").style = "display:visible";
}

function timecounting() {
  myTime = setInterval(() => {
    time -= 1;
    document.getElementById("timecount").innerHTML = time;
    if (time == 0) {
      timesOut();
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
    alert("You're out of guess!");
    document.getElementById("actionGuess").disabled = true;
    document.getElementById("reset").style = "display:visible";
    clearInterval(myTime);
  }
}

function guess() {
  let userNumber = document.getElementById("userInput").value;

  if (text.includes(userNumber)) {
    if (guessTime > 0) {
      result = "You've guessed this number before";
      document.getElementById("resultArea").innerHTML = result;
    } else {
      alert("You're out of guess!");
      document.getElementById("actionGuess").disabled = true;
      document.getElementById("reset").style = "display:visible";
      clearInterval(myTime);
    }
  } else {
    if (userNumber >= 0 && userNumber <= 10) {
      reduceGuessTime();
      if (computerNumber < userNumber) {
        result = "too big";
        document.getElementById("resultArea").innerHTML = result;
      } else if (computerNumber > userNumber) {
        result = "too small";
        document.getElementById("resultArea").innerHTML = result;
      } else if (computerNumber == userNumber) {
        result = "Correct";
        document.getElementById("resultArea").innerHTML = result;
        alert("You won!");
        document.getElementById("actionGuess").disabled = true;
        document.getElementById("reset").style = "display:visible";
      }

      text.push(userNumber);
      text.splice(3, 1);
      document.getElementById("guessHistory").innerHTML = text;
    } else {
      alert("Please choose number from 0-10 only");
    }
  }
}

function resetGame() {
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
}
