import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', function () {
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

  const datePicker = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = new Date(selectedDates[0]);

      if (isNaN(selectedDate) || selectedDate <= new Date()) {
        Notiflix.Notify.warning('Please choose a date in the future');
        return;
      }

      startButton.disabled = false;
    },
  });

  const startButton = document.querySelector('[data-start]');
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  let countdownInterval;

  startButton.addEventListener('click', function () {
    const selectedDate = new Date(datePicker.selectedDates[0]);

    if (isNaN(selectedDate) || selectedDate <= new Date()) {
      Notiflix.Notify.Failure(
        'Please choose a valid date and time in the future.'
      );
      return;
    }

    startButton.disabled = true;

    function updateTimer() {
      const currentDate = new Date();
      const timeDifference = selectedDate - currentDate;

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
  });

  function resetTimerInterface() {
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    startButton.disabled = false;

    Notiflix.Notify.Failure(
      'Please choose a valid date and time in the future.'
    );
  }
});
