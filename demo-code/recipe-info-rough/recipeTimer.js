/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
let setTime;
let timerID;

function setTimer() {
  if (timerID !== 'undefined') {
    clearInterval(timerID);
    document.getElementById('pause').innerHTML = 'Pause';
  }
  const hours = document.getElementById('hours').value;
  const minutes = document.getElementById('minutes').value;
  const seconds = document.getElementById('seconds').value;
  if (!(hours <= -1 || hours > 23 || minutes <= -1 || minutes > 59 || seconds <= -1
    || seconds > 59) && !(hours === 0 && minutes === 0 && seconds === 0)) {
    setTime = hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000;
    updateTimer();
  } else {
    document.getElementById('timer').innerHTML = 'Invalid Timer';
    clearInterval(timerID);
  }
}

function updateTimer() {
  let distance = setTime;
  timerID = setInterval(() => {
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('timer').innerHTML = `${hours}h ${minutes}m ${seconds}s `;
    if (distance < 0) {
      clearInterval(timerID);
      const audioElement = new Audio('Gentle-wake-alarm-clock.mp3');
      audioElement.play();
      document.getElementById('timer').innerHTML = 'Done!';
    }
    distance -= 1000;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerID);
  document.getElementById('timer').innerHTML = 'Begin Timer';
  document.getElementById('hours').value = 0;
  document.getElementById('minutes').value = 0;
  document.getElementById('seconds').value = 0;
}

function pauseTimer() {
  const timerInfo = document.getElementById('timer').innerHTML;
  if (!(timerInfo === 'Done!' || timerInfo === 'Begin Timer' || timerInfo === 'Invalid Timer')) {
    const label = document.getElementById('pause').innerHTML;
    const str = document.getElementById('timer').innerHTML;
    if (label === 'Pause') {
      clearInterval(timerID);
      document.getElementById('timer').innerHTML = `${str} (Paused)`;
      document.getElementById('pause').innerHTML = 'Resume';
    } else {
      const numbers = str.match(/\d+/g);
      document.getElementById('hours').value = numbers[0];
      document.getElementById('minutes').value = numbers[1];
      document.getElementById('seconds').value = numbers[2];
      setTimer();
    }
  }
}

function displayTimer() {
  const displayLabel = document.getElementById('shown').innerHTML;
  if (displayLabel === 'Minimize') {
    const timerLabel = document.getElementById('timer').innerHTML;
    if (timerLabel === 'Invalid Timer' || timerLabel === 'Begin Timer') {
      document.getElementById('timeInput').style.display = 'none';
      document.getElementById('pause').style.display = 'none';
      document.getElementById('reset').style.display = 'none';
      document.getElementById('timer').style.display = 'none';
      document.querySelector('div.timer').style.height = '40px';
    } else {
      document.getElementById('timeInput').style.display = 'none';
      document.getElementById('pause').style.display = 'none';
      document.getElementById('reset').style.display = 'none';
      document.querySelector('div.timer').style.height = '60px';
      document.getElementById('timer').style.margin = '0rem 0rem 0.5rem 0rem';
    }
    document.getElementById('shown').innerHTML = 'Maximize';
  }
  if (displayLabel === 'Maximize') {
    document.getElementById('timeInput').style.display = 'inline-flex';
    document.getElementById('pause').style.display = 'inline-block';
    document.getElementById('reset').style.display = 'inline-block';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('timer').style.margin = '1rem 1rem 1rem 1rem';
    document.querySelector('div.timer').style.height = '140px';
    document.getElementById('shown').innerHTML = 'Minimize';
  }
}

// Draggable timer functionality

const timer = document.querySelector('div.timer');
timer.addEventListener('mousedown', mousedown);

function mousedown(e) {
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);
  const rect = timer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left + 10;
  const offsetY = e.clientY - rect.top + 15;

  function mousemove(e1) {
    timer.style.left = `${e1.clientX - offsetX}px`;
    timer.style.top = `${e1.clientY - offsetY}px`;
  }

  function mouseup() {
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  }
}
