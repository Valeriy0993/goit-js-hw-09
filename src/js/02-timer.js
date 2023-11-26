import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix'; // Додайте імпорт бібліотеки Notiflix

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateSelectedDate(selectedDates);
  },
};

flatpickr('#datetime-picker', options);

const timer = document.querySelector('.timer');
const daysElement = timer.querySelector('[data-days]');
const hoursElement = timer.querySelector('[data-hours]');
const minutesElement = timer.querySelector('[data-minutes]');
const secondsElement = timer.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');

let countdownInterval;

function validateSelectedDate(selectedDates) {
  const selectedDate = selectedDates[0];

  if (!selectedDate) {
    return false;
  }

  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.warning('Please choose a date in the future'); // Замініть window.alert() на Notiflix.Notify.warning()
    startButton.disabled = true;
    return false;
  }

  startButton.disabled = false;
  return true;
}

function startTimer(targetDate) {
  clearInterval(countdownInterval);

  function updateTimer() {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      resetTimerInterface();
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }

  updateTimer();

  countdownInterval = setInterval(updateTimer, 1000);

  startButton.disabled = true;
}

function resetTimerInterface() {
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  startButton.disabled = false;
}

function padZeroes(number) {
  return number.toString().padStart(2, '0');
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', () => {
  const selectedDates = flatpickr('#datetime-picker').selectedDates;

  if (validateSelectedDate(selectedDates)) {
    startTimer(selectedDates[0]);
  }
});
