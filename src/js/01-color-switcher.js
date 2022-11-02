const bodyEl = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', changeColor);
btnStop.addEventListener('click', stopChangeColor);

let intervalId = null;

function changeColor() {
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function stopChangeColor() {
  clearInterval(intervalId);
  btnStop.disabled = true;
  btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
