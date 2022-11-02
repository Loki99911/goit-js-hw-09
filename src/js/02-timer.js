import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputField = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const valueDay = document.querySelector('span[data-days]');
const valueHours = document.querySelector('span[data-hours]');
const valueMinutes = document.querySelector('span[data-minutes]');
const valueSeconds = document.querySelector('span[data-seconds]');
const timerEl = document.querySelector('.timer');
let selectedDate = 0;
let timerId = null;
btnStart.disabled = true;

// CSS________________________________________________
timerEl.style.gap = `40px`;
timerEl.style.fontSize = `40px`;
timerEl.style.display = 'flex';
function changeColor() {
  setInterval(() => {
    timerEl.children[3].style.color = getRandomHexColor();
  }, 1000);
  setInterval(() => {
    timerEl.children[2].style.color = getRandomHexColor();
  }, 60000);
  setInterval(() => {
    timerEl.children[1].style.color = getRandomHexColor();
  }, 3600000);
  setInterval(() => {
    timerEl.children[0].style.color = getRandomHexColor();
  }, 86400000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// CSS________________________________________________
// library__________________________________
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();

    if (new Date().getTime() > selectedDate) {
      btnStart.disabled = true;
      // window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
  },
};

const time = flatpickr('#datetime-picker', options);
// library__________________________________

btnStart.addEventListener('click', start);

function start() {
  if (btnStart.disabled === false) {
    btnStart.disabled = true;
    inputField.disabled = true;
    startTiming();
    changeColor();
  }
}

function startTiming() {
  timerId = setInterval(callback, 1000);
}

function callback() {
  const currentDate = new Date().getTime();
  const { days, hours, minutes, seconds } = convertMs(
    selectedDate - currentDate
  );
  valueDay.textContent = days;
  valueHours.textContent = hours;
  valueMinutes.textContent = minutes;
  valueSeconds.textContent = seconds;
  if (selectedDate - currentDate <= 1000) {
    Notiflix.Notify.success('Time is up!!!');
    clearInterval(timerId);
    inputField.disabled = false;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addZero(value) {
  return String(value).padStart(2, '0');
}
