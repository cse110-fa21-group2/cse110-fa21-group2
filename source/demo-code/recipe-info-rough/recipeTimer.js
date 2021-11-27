let setTime;
var timerID;

function setTimer() {
  if(timerID != "undefined"){
    clearInterval(timerID);
    document.getElementById("pause").innerHTML = "Pause";
  }
  let hours = document.getElementById("hours").value;
  let minutes = document.getElementById("minutes").value;
  let seconds = document.getElementById("seconds").value;
  if(!(hours <= -1 || hours > 23 || minutes <= -1 || minutes > 59 || seconds <= -1 || seconds > 59) && !(hours == 0 && minutes == 0 && seconds == 0)){
    const currTime = new Date().getTime();
    setTime = currTime + hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000;
    updateTimer();
  }
  else {
    document.getElementById("timer").innerHTML = "Invalid Timer";
    clearInterval(timerID);
  }
}

function updateTimer() {
  timerID = setInterval(function() {
    const currTime = new Date().getTime();
    let distance = setTime - currTime;
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    if (distance < 0) {
      clearInterval(timerID);
      document.getElementById("timer").innerHTML = "Done!";
      timerSet = false;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerID);
  document.getElementById("timer").innerHTML = "Begin Timer"
  document.getElementById("hours").value = 0;
  document.getElementById("minutes").value = 0;
  document.getElementById("seconds").value = 0;
}

function pauseTimer() {
  let timerInfo = document.getElementById("timer").innerHTML;
  if(timerInfo == "Done!" || timerInfo == "Begin Timer" || timerInfo == "Invalid Timer"){
  }
  else{
    let label = document.getElementById("pause").innerHTML;
    let str = document.getElementById("timer").innerHTML;
    if(label == "Pause"){
      clearInterval(timerID);
      document.getElementById("timer").innerHTML = str + " (Paused)";
      document.getElementById("pause").innerHTML = "Resume";
    }
    else {
      let numbers = str.match(/\d+/g);
      document.getElementById("hours").value = numbers[0];
      document.getElementById("minutes").value = numbers[1];
      document.getElementById("seconds").value = numbers[2];
      setTimer();
    }
  }
}

